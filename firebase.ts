// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3DJX6mhZNnQgCBKBXvTf6ueSFVH1tOOs",
  authDomain: "rozgaar-cad44.firebaseapp.com",
  projectId: "rozgaar-cad44",
  storageBucket: "rozgaar-cad44.firebasestorage.app",
  messagingSenderId: "541207213656",
  appId: "1:541207213656:web:b025e8b46656767abbfc2d",
  measurementId: "G-S40YJY5BHK",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
