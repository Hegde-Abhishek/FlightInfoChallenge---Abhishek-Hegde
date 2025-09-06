// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBBtYnCcGq9Adzl3YhE9M2IGJKxz0OuY10",
//   authDomain: "flight-app--abhishek-hegde.firebaseapp.com",
//   projectId: "flight-app--abhishek-hegde",
//   storageBucket: "flight-app--abhishek-hegde.firebasestorage.app",
//   messagingSenderId: "169323423352",
//   appId: "1:169323423352:web:c6a391b583d5b782186f8d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBBtYnCcGq9Adzl3YhE9M2IGJKxz0OuY10",
    authDomain: "flight-app--abhishek-hegde.firebaseapp.com",
    projectId: "flight-app--abhishek-hegde",
    storageBucket: "flight-app--abhishek-hegde.firebasestorage.app",
    messagingSenderId: "169323423352",
    appId: "1:169323423352:web:c6a391b583d5b782186f8d",
  },
  api: {
    endpoint: "https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge",
    token: "WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh",
    candidate: "Abhishek Hegde",
  }
};