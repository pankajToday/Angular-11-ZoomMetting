importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyBv6ErZlnHihnvjwfSz3vDHH89c9x_UeBg",
    authDomain: "test-project-75a34.firebaseapp.com",
    projectId: "test-project-75a34",
    storageBucket: "test-project-75a34.appspot.com",
    messagingSenderId: "72122852414",
    appId: "1:72122852414:web:426e132938eec42ef35d6f",
    measurementId: "G-N4DRHEVXWC"
});
const messaging = firebase.messaging();