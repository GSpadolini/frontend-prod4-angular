importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCnToeV7j7Z8PQoJcY0NNBpG6hiB8GboIY",
    authDomain: "frontend-5088a.firebaseapp.com",
    projectId: "frontend-5088a",
    storageBucket: "frontend-5088a.appspot.com",
    messagingSenderId: "417204717894",
    appId: "1:417204717894:web:2c5f8e35bdc24eb13f3d47"
});

const messaging = firebase.messaging();