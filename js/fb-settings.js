// Initialize Firebase
var myInfo = {}
initFirebase()
isLoginUser()

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

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

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

$('#save').on('click', () => {
  console.log('(｀・ω・´)')
  db.collection('data').add({
    text: $('#txt').val(),
    'voice-pitch': $('#voice-pitch').val(),
    freq: $('#freq').val(),
    level: $('#level').val(),
    date: Date.now(),
    uid: myInfo.uid,
    user: myInfo.name
  })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
})
