import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

var firebase = require('firebase');
var firebaseui = require('firebaseui');

$(document).ready(function(){

    const firebaseConfig = {
        // ...   
    };

    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    console.log(app);

    if(getCookie("user") != null){
        signInUser(user.email, user.password);
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const uid = user.uid;
      $("#sign-in-nav").hide();
    } else {
      $("#sign-in-nav").show();
    }
  });

function setCookie(name, value, days){
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    let expiration = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expiration};path=/`;
}

function getCookie(cname){
    let name = `${cname}=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');

    for(let i = 0; i < cookies.length; i++){
        let cookie = cookies[i];
        while(cookie.charAt(0) == ' '){
            cookie = cookie.substring(1);
        }
        if(cookie.indexOf(name) === 0){
            return cookie.substring(name.length, cookie.length);
        }
    }
}


function registerUser(email, password){

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setCookie("user", user, 3);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}