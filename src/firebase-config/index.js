import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDletUi2q8wRQ1ktjfDRQnN2oBokXLkSvI",
    authDomain: "react-projects-firebase-todo.firebaseapp.com",
    projectId: "react-projects-firebase-todo",
    storageBucket: "react-projects-firebase-todo.firebasestorage.app",
    messagingSenderId: "947063166989",
    appId: "1:947063166989:web:0dd82af10754b429d15d44",
    measurementId: "G-47NWB355FX"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  export const db = getFirestore(firebaseApp);
