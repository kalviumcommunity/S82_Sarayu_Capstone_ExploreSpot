// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAO2x5D0QX3PALRVXn52qGZJqsl9auF_o",
  authDomain: "explore-spot.firebaseapp.com",
  projectId: "explore-spot",
  storageBucket: "explore-spot.firebasestorage.app",
  messagingSenderId: "59063301897",
  appId: "1:59063301897:web:1449a4dbf3d91a1398c5d8",
  measurementId: "G-KPX3B5QRN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
