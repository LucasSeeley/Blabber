$(document).ready(function(){

    const app = firebase.app();
    console.log(app);
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