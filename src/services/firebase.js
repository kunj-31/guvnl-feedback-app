// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// --- ADD THESE LINES ---
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// -----------------------

// Your web app's Firebase configuration
// This is your actual config, which is correct
const firebaseConfig = {
  apiKey: "AIzaSyDMlpLh9Kwu9Vh1atF67dA6IE8Spb4tHlk",
  authDomain: "guvnl-feedback-system.firebaseapp.com",
  projectId: "guvnl-feedback-system",
  storageBucket: "guvnl-feedback-system.appspot.com", // Corrected this line, ".firebase" is not needed here
  messagingSenderId: "139190700557",
  appId: "1:139190700557:web:146a3b94191299f17f6344",
  measurementId: "G-62JTC2JS4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- ADD THESE LINES TO EXPORT THE SERVICES ---
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// ----------------------------------------------