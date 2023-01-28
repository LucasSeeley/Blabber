import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

console.log(app);

// this is what signs the user back in on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      $("#sign-in-nav").hide().css("visibility", "hidden");
      $("#profile-nav").show().css("visibility", "visible");
      console.log("auth state");
    } else {
      $("#profile-nav").hide().css("visibility", "hidden");
      $("#sign-in-nav").show().css("visibility", "visible");
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

$("#register-submit").bind('click', function(){

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error(errorCode);
    console.error(errorMessage);
  });
});

$("#login-submit").bind('click', function(){
  const email = $('#email').val();
  const password = $('#password').val();
  const rememberUser = $('#remember-me').is(":checked");
  console.log(rememberUser);

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(rememberUser === true){
      setCookie("rememberUser", true, 7);
      console.log(getCookie("rememberUser"));
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error(errorCode);
    console.error(errorMessage);
  });
});

$("#sign-out").bind('click', function(){
  signOut(auth).then(() => {
    setCookie("rememberUser", false, -1);
    window.location.replace("index.html");
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error(errorCode);
    console.error(errorMessage);
  });

});

// if user did not select remember me the user will be logged out
$(window).on("beforeunload", function(){
  if(getCookie("rememberUser") != "true"){
    signOut(auth).then(() => {
      return;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);
    });
  }
});