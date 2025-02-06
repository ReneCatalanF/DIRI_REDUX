// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNEJDVMHQY8BnaO2ZKkGBQbvoEHXhZBeo",
    authDomain: "diri-9ed53.firebaseapp.com",
    databaseURL: "https://diri-9ed53-default-rtdb.firebaseio.com",
    projectId: "diri-9ed53",
    storageBucket: "diri-9ed53.firebasestorage.app",
    messagingSenderId: "710505225558",
    appId: "1:710505225558:web:a1489ff5c4b458c28b4af7",
    measurementId: "G-4SMWBK22RK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);