// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb8FVzjjGcAxNrbgfU98Q5rVIeC0GuYtc",
  authDomain: "netflixgpt-ec537.firebaseapp.com",
  projectId: "netflixgpt-ec537",
  storageBucket: "netflixgpt-ec537.appspot.com",
  messagingSenderId: "548469958097",
  appId: "1:548469958097:web:89f7010633c9bcd5ce6cf0",
  measurementId: "G-PT9LSQFECE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
