// firebase-messaging-ws.ts

import * as firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCnToeV7j7Z8PQoJcY0NNBpG6hiB8GboIY",
  authDomain: "frontend-5088a.firebaseapp.com",
  projectId: "frontend-5088a",
  storageBucket: "frontend-5088a.appspot.com",
  messagingSenderId: "417204717894",
  appId: "1:417204717894:web:2c5f8e35bdc24eb13f3d47"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
export { messaging };
