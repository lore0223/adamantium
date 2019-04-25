// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var app_fireBase = {};
(function () {
  var config = {
    apiKey: "AIzaSyDXy5eN5wzec8uCqg3ZvAn-z-hLSEP8NkI",
    authDomain: "adamantium-64b17.firebaseapp.com",
    databaseURL: "https://adamantium-64b17.firebaseio.com",
    projectId: "adamantium-64b17",
    storageBucket: "adamantium-64b17.appspot.com",
    messagingSenderId: "727524590455"
  };

  firebase.initializeApp(config);
  app_fireBase = firebase;
  console.log(firebase);
})()

precompiled = () => {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        return true;
      },
      uiShown: function () {
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: '#level1',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   ],
    callbacks: {
      signInFailure: function (error) {
        if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
          return Promise.resolve();
        }
        var cred = error.credential;
        return firebase.auth().signInWithCredential(cred);
      }
    }

  };
  ui.start('#firebaseui-auth-container', uiConfig);
}
precompiled();

const loginGoogle = document.getElementById('login');
loginGoogle.addEventListener('click', () => {
  authenticationGoogle();
})

authenticationGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider).then(function (result) {
    var token = result.credential.accessToken;
    console.log(token);
    var user = result.user;
    console.log(user);
    alert('hola');
  }).catch(function (error) {
    alert(error);
  });

}



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('hay usuario activo')
    location.replace('#level-1');
    document.getElementsByClassName('section-app').style.display="none";
  
  } else {
    console.log('no hay usuario activo')
    uid = null;
  }
})


// Cerrar sesión
const logOut = () => {
  firebase.auth().signOut();
}

const logOutButton = document.getElementById('logout');
logOutButton.addEventListener('click', () => {
  logOut();
  location.reload();
})