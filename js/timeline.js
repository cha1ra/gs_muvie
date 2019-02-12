// Initialize Firebase
var myInfo = {}
let currentTL = 'all'
initFirebase()
var db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const dataRef = db.collection('data')
isLoginUser()
realTimeUpdater(currentTL)

/* -------------------------------
Initialize Firebase and set db settings
------------------------------- */
function initFirebase () {
  var config = {
    apiKey: 'AIzaSyDP2KKgkPHu8ddrEascGnquw1Vu_bXbEUg',
    authDomain: 'muve-e681a.firebaseapp.com',
    databaseURL: 'https://muve-e681a.firebaseio.com',
    projectId: 'muve-e681a',
    storageBucket: 'muve-e681a.appspot.com',
    messagingSenderId: '230386052303'
  }
  firebase.initializeApp(config)
}

/* -------------------------------
Login Authentication
------------------------------- */
function isLoginUser () {
  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user)
    if (user) {
      getMyInfo(user)
      return true
    } else {
      // No user is signed in.
      location.href = './login.php'
      return false
    }
  })

  function getMyInfo (user) {
    myInfo.name = user.displayName
    myInfo.uid = user.uid
    console.log(myInfo)
  }
}

/* -------------------------------
Realtime Update
------------------------------- */
function realTimeUpdater (currentTL) {
  update(currentTL)
  return false

  function update (currentTL) {
    console.log(currentTL)

    var val
    if (currentTL == 'me') {
      val = dataRef.where('user', '==', myInfo.name).orderBy('date', 'asc')
    } else {
      val = dataRef.orderBy('date', 'desc')
    }
    val.onSnapshot(function (querySnapshot) {
      $('#timeline').empty()
      querySnapshot.forEach(function (doc) {
        $('#timeline').append(createBookHtml(doc))
      })
    })
  }
}

/* -------------------------------
Search function
------------------------------- */

function searchWord (searchWord) {
  $('.book').each(function () {
    console.log($(this).text().indexOf(searchWord))
    console.log($(this).find('.comment').text())
    if ($(this).text().indexOf(searchWord) != -1) {
      $(this).fadeIn()
    } else {
      $(this).fadeOut()
    }
  })
}

/* -------------------------------
Post related function
------------------------------- */

function postData (postsRef) {
  postsRef.add({
    text: 'てsつ', // $('#').val(),
    date: Date.now(),
    group: 'me',
    user: myInfo.name
  })
    .then(function (docRef) {
      console.log('以下のIDで書き出されました: ', docRef.id)
      realTimeUpdater(currentTL)
    })
    .catch(function (error) {
      console.error('投稿追加時のエラー: ', error)
    })
}

// function getAllPosts(postsRef,tl){
//     if(tl == "me"){
//         postsRef
//             .orderBy('date')
//             .where("uid", "==", myInfo.uid)
//             .get()
//             .then((snapshot) => {
//                 snapshot.docs.forEach(doc =>{
//                     $('#timeline').append(createBookHtml(doc));
//                     console.log('fin');
//                 });
//                 setEachUrlTitle();
//                 scrollToBottom();
//             });
//     }else{
//         postsRef
//             .orderBy('date')
//             .get()
//             .then((snapshot) => {
//                 snapshot.docs.forEach(doc =>{
//                     $('#timeline').append(createBookHtml(doc));
//                     console.log('fin');
//                 });
//                 setEachUrlTitle();
//                 scrollToBottom();
//             });
//     }
//     console.log('Get All Posts...');
// }

function createBookHtml (doc) {
  let docData = doc.data()
  let bookHtml =
        '<div class="data">\n' +
            dataContent(docData) +
        '</div>\n'

  return bookHtml

  function dataContent (docData) {
    let result =
            '<div class="card blue-grey darken-1">' +
                '<div class="card-content white-text">' +
                    '<div class="user-info">' +
                        '<span class="card-title">' +
                            docData.text +
                        '</span>' +
                    '</div>' +

                    '<div class="user-info">' +
                        '<p>' +
                            docData.user +
                        '</p>' +
                    '</div>' +
                    '<p class="date">' +
                       formatDate(docData.date) +
                    '</p>' +
                '</div>' +
            '</div>\n'
    return result
  }
}

function formatDate (val) {
  let d = new Date(val)
  let result = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${addZero(d.getHours())}:${addZero(d.getMinutes())}`
  return result

  function addZero (val) {
    if (val < 10) return '0' + val
    else return val
  }
}
