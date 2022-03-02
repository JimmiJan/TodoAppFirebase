// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Ngh9ZpIq04QO4GJuBxGiPJ2bi7DBzJs",
  authDomain: "jamshedtodoapp.firebaseapp.com",
  projectId: "jamshedtodoapp",
  storageBucket: "jamshedtodoapp.appspot.com",
  messagingSenderId: "978607084610",
  appId: "1:978607084610:web:820dd9a385efd1ae5189db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore()
export {db}