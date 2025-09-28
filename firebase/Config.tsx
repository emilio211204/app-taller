// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQkSJzl6SOkLNTRy97ABFs1-ibGp1SA8I",
    authDomain: "app-firebase-6490e.firebaseapp.com",
    databaseURL: "https://app-firebase-6490e-default-rtdb.firebaseio.com",
    projectId: "app-firebase-6490e",
    storageBucket: "app-firebase-6490e.firebasestorage.app",
    messagingSenderId: "779495102947",
    appId: "1:779495102947:web:4012486073ab8098a0e8d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();