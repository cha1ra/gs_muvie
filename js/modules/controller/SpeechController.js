export class SpeechController {
  constructor (props) {
    this.msg = new SpeechSynthesisUtterance()
    this.voices = window.speechSynthesis.getVoices()
    this.msg.text = props.word // 喋る内容
    this.init()
  }
  init () {
    this.msg.voice = this.voices[7] // 7:Google 日本人 ja-JP ※他は英語のみ（次項参照）
    this.msg.volume = 1.0 // 音量 min 0 ~ max 1
    this.msg.rate = 1.0 // 速度 min 0 ~ max 10
    this.msg.pitch = Math.random() * 2 // 音程 min 0 ~ max 2
    this.msg.lang = 'ja-JP'
  }
  start () {
    // 発話実行
    window.speechSynthesis.speak(this.msg)

    // 終了時の処理
    this.msg.onend = function (event) {
      console.log('喋った時間：' + event.elapsedTime + 's')
    }
  }
  pause () {
    window.speechSynthesis.pause()
  }
  resume () {
    window.speechSynthesis.resume()
  }

  get msg () { return this._msg }
  set msg (val) { this._msg = val }
}

export default SpeechController
