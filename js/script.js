import OscController from './modules/controller/OscController.js'
import SpeechController from './modules/controller/SpeechController.js'

/* -----------------
Web Audio API Test
https://www.g200kg.com/jp/docs/webaudio/generatesound.html
----------------- */

// iOS Safariなど、一部プリフィックスが必要なブラウザへの対応
window.AudioContext = window.webkitAudioContext || window.AudioContext

let oscArr = Array(5).fill(0)
oscArr.forEach((el, i) => {
  oscArr[i] = new OscController()
  oscArr[i].osc.start()
  oscArr[i].gain.gain.value = 0
  setOnStartEvent(i)
})

function setOnStartEvent (i) {
  $('#play' + i).on('click', () => { oscArr[i].play(0) })
}

function startPlay (t, end, hz, m) {
  let oscArrChord = []
  for (let i = 0; i < 5; i++) {
    oscArrChord[i] = new OscController()
  }

  oscArrChord[0].osc.frequency.value = hz
  oscArrChord[1].osc.frequency.value = hz + (hz / 5)
  oscArrChord[2].osc.frequency.value = hz + (hz / 4)
  oscArrChord[3].osc.frequency.value = hz + (hz / 2)
  oscArrChord[4].osc.frequency.value = hz / 2 / 2

  for (let i = 0; i < 5; i++) {
    switch (i) {
      case 1:
        if (m == 'min') {
          oscArrChord[1].play(t)
          oscArrChord[1].stop(end)
        }
        break
      case 2:
        if (m == 'maj') {
          oscArrChord[2].play(t)
          oscArrChord[2].stop(end)
        }
        break
      default:
        oscArrChord[i].play(t)
        oscArrChord[i].stop(end)
    }
  }
  return oscArrChord
}

let firstHz = 440
changeFrequency(firstHz)
function changeFrequency (hz) {
  // console.log(hz, hz + (hz / 4), hz + (hz / 2))
  oscArr[0].osc.frequency.value = hz
  oscArr[1].osc.frequency.value = hz + (hz / 5)
  oscArr[2].osc.frequency.value = hz + (hz / 4)
  oscArr[3].osc.frequency.value = hz + (hz / 2)
  oscArr[4].osc.frequency.value = hz / 2 / 2
}

let $setValue = function () {
  let inputValue = +$(this).val()
  switch ($(this).attr('id')) {
    case 'type':
      oscArr[0].osc.type = inputValue
      break
    case 'freq':
      // oscArr[0].osc.frequency.value = inputValue
      changeFrequency(inputValue)
      break
    case 'level':
      oscArr[0].gain.gain.value = inputValue
      oscArr[1].gain.gain.value = inputValue
      oscArr[2].gain.gain.value = inputValue
      oscArr[3].gain.gain.value = inputValue
      oscArr[4].gain.gain.value = inputValue
      break
    case 'voice-pitch':
      // oscArr[0].osc.frequency.value = inputValue
      sc.msg.pitch = inputValue / 1000
      break
  }
  $('#changeValue').html(inputValue)
}

// $('#play').on('click', $playAudio)

$('#stop').on('click', function () {
  console.log('stop!')
  osc.stop()
})

$('input[type=range]').on('input', $setValue)
$('#type').on('change', $setValue)

/* -----------------
8 beat
https://www.html5rocks.com/ja/tutorials/webaudio/intro/
----------------- */
const audioctx = new AudioContext()

var RhythmSample = {}

RhythmSample.play = function () {
  function playSound (buffer, time) {
    var source = audioctx.createBufferSource()
    source.buffer = buffer
    source.connect(audioctx.destination)
    if (!source.start) { source.start = source.noteOn }
    source.start(time)
  }

  var kick = BUFFERS.kick
  var snare = BUFFERS.snare
  var hihat = BUFFERS.hihat

  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = audioctx.currentTime + 0.100
  var tempo = 80 // BPM (beats per minute)
  var eighthNoteTime = (60 / tempo) / 2

  // Play 2 bars of the following:
  for (var bar = 0; bar < 4; bar++) {
    var time = startTime + bar * 8 * eighthNoteTime
    // Play the bass (kick) drum on beats 1, 5
    playSound(kick, time)
    playSound(kick, time + 4 * eighthNoteTime)

    // startPlay(time, time + 4 * eighthNoteTime, 440, 'min')
    // startPlay(time + 4 * eighthNoteTime, 660, 'maj')

    // Play the snare drum on beats 3, 7
    playSound(snare, time + 2 * eighthNoteTime)
    playSound(snare, time + 6 * eighthNoteTime)

    // Play the hi-hat every eighthh note.
    for (var i = 0; i < 8; ++i) {
      playSound(hihat, time + i * eighthNoteTime)
    }
  }

  // morphResult.forEach((el, i) => {
  //   setTimeout(() => {
  //     speechWord(el)
  //   }, i * eighthNoteTime * 1000 * 3)
  //   console.log(startTime + i * eighthNoteTime * 1000 * 3)
  // })
}

$('#eight').on('click', () => {
  RhythmSample.play()
})

/* -------------------------
Speech API
------------------------- */

const rec = new webkitSpeechRecognition()
rec.lang = 'ja'

$('#listen').on('click', function () {
  console.log('click')
  rec.start()
})

rec.onresult = function (e) {
  console.log('on result')
  let recResult = e.results[0][0].transcript
  // setDataToDb(recResult)
  $('#txt').val(recResult)
  console.log(recResult)
}

rec.onend = () => { }// rec.start() }

/* -------------------------
Speech API Speecj Synthesis API
------------------------- */
let morphResult = []

// unsupported.
if (!('SpeechSynthesisUtterance' in window)) {
  alert('Speech synthesis(音声合成) APIには未対応です.')
}

// 発話機能をインスタンス化
var msg = new SpeechSynthesisUtterance()
var voices = window.speechSynthesis.getVoices()

$('#btn').on('click', function () {
  // 以下オプション設定（日本語は効かないもよう。。）
  msg.voice = voices[7] // 7:Google 日本人 ja-JP ※他は英語のみ（次項参照）
  msg.volume = 1.0 // 音量 min 0 ~ max 1
  msg.rate = 1.0 // 速度 min 0 ~ max 10
  msg.pitch = 1.0 // 音程 min 0 ~ max 2

  msg.text = $('#txt').val() // 喋る内容
  msg.lang = 'ja-JP' // en-US or ja-JP
  // msg.lang = 'en-US'; // en-US or ja-JP

  // 発話実行
  speechSynthesis.speak(msg)

  // 終了時の処理
  msg.onend = function (event) {
    console.log('喋った時間：' + event.elapsedTime + 's')
  }
})

// 形態素解析にぶっ込む
$('#morph').on('click', () => {
  $('.input-field').fadeOut()
  // POST to PHP file to get JSON info.
  $.ajax({
    type: 'POST',
    dataType: 'xml',
    url: './php/json.php',
    data: {
      appid: 'dj00aiZpPUU0N2laSUpaSzJPSyZzPWNvbnN1bWVyc2VjcmV0Jng9Y2U-',
      sentence: $('#txt').val(),
      results: 'ma,uniq'
    }
  })
    .then(
      // Success to get XML
      (xml) => {
        console.log(xml)

        // 形態素を取り出す
        morphResult = []
        $('#txt-morph').html('')
        $(xml).find('ma_result').each(function () {
          $(this).find('word').each(function () {
            const tag = $(this).find('surface').text()
            const pos = $(this).find('pos').text()

            morphResult.push(tag)
            switch (pos) {
              case '名詞':
              case '形容詞':
              case '動詞':
                $('#txt-morph').append(`
                  <div class="chip">
                    ${tag}
                    <i class="close material-icons">close</i>
                  </div>
                `)
                break
            }
            console.log(tag)
          })
        })
        console.log(morphResult)
        setWord(morphResult)
        $('.hidden').fadeIn()
      },
      // Fail to get XML
      () => {
        alert('Failed to get data...')
      }
    )
})

// 喋る機能の関数化
function speechWord (word) {
  // 以下オプション設定（日本語は効かないもよう。。）
  msg.voice = voices[7] // 7:Google 日本人 ja-JP ※他は英語のみ（次項参照）
  msg.volume = 1.0 // 音量 min 0 ~ max 1
  msg.rate = 1.0 // 速度 min 0 ~ max 10
  msg.pitch = Math.random() * 2 // 音程 min 0 ~ max 2

  msg.text = word // 喋る内容
  msg.lang = 'ja-JP' // en-US or ja-JP
  // msg.lang = 'en-US'; // en-US or ja-JP

  // 発話実行
  speechSynthesis.speak(msg)

  // 終了時の処理
  msg.onend = function (event) {
    console.log('喋った時間：' + event.elapsedTime + 's')
  }
}

// let sc = []
function setWord (morphResult) {
  // sc = new Array(morphResult).fill(0)
  morphResult.forEach((el, i) => {
    console.log(el, i)
    // sc[i] = new SpeechController({ word: el })
    // console.log(sc[i].msg.text)
    // sc[i].start()
    // sc[i].pause()
  })
  // console.log(sc)
}

let sc = new SpeechController({ word: 'テスト' })
// sctest.start()
// sctest.pause()

let num = 0
let chordNum = 0
$('#main-button').on('click', function () {
  console.log('click!')
  console.log(chordArr.oudou[chordNum])
  changeChord(chordArr.oudou[chordNum][0], chordArr.oudou[chordNum][1])
  if (chordNum < 7) {
    chordNum++
  } else {
    chordNum = 0
  }
  console.log('chordNum', chordNum)

  sc.msg.text = morphResult[num]
  sc.start()

  $('#typo').text(sc.msg.text)
  specificPropertyParameters

  num++
  num = morphResult[num] == undefined ? 0 : num
})

function changeChord (hz, m) {
  console.log('changeChord', hz, m, $('#level').val())

  oscArr[0].osc.frequency.value = hz
  oscArr[1].osc.frequency.value = hz + (hz / 5)
  oscArr[2].osc.frequency.value = hz + (hz / 4)
  oscArr[3].osc.frequency.value = hz + (hz / 2)
  oscArr[4].osc.frequency.value = hz / 2 / 2

  for (let i = 0; i < 5; i++) {
    switch (i) {
      case 1:
        if (m == 'min') {
          oscArr[1].gain.gain.value = $('#level').val()
          oscArr[2].gain.gain.value = 0
        }
        break
      case 2:
        if (m == 'maj') {
          oscArr[2].gain.gain.value = $('#level').val()
          oscArr[1].gain.gain.value = 0
        }
        break
      default:
        oscArr[i].gain.gain.value = $('#level').val()
    }
  }
}

let chordArr = {
  oudou: [[349, 'maj'], [392, 'maj'], [330, 'maj'], [440, 'min'], [349, 'maj'], [392, 'maj'], [262, 'maj'], [262, 'maj']]
}

// POST to PHP file to get JSON info.
$.ajax({
  type: 'POST',
  dataType: 'json',
  url: './php/json-news.php'
})
  .then(
    // Success to get XML
    (xml) => {
      console.log('News API')
      console.log(xml)
      $('#news-list').append(`<table class="striped">`)
      xml.articles.forEach(el => {
        $('#news-list').append(`<tr><td>${el.description.slice(0, 30)}</td></tr>`)
        console.log(el.description)
      })
      $('#news-list').append(`</table>`)
    },
    // Fail to get XML
    () => {
      alert('Failed to get data...')
    }
  )
