import React from "react";

const firebase = {
  apiKey: "AIzaSyAUG-XKOAY5JT7aJH6fAZWvkmPoZcftnkk",
  authDomain: "samasya-sewa.firebaseapp.com",
  projectId: "samasya-sewa",
  storageBucket: "samasya-sewa.firebasestorage.app",
  messagingSenderId: "663987706892",
  appId: "1:663987706892:web:79985a52f58aa870c8e229",
  measurementId: "G-7C854SS3JY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebaseApp.storage();

export { storage, firebaseApp };
