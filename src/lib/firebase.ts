'use client';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "digital-emporium-l6iku",
  "appId": "1:852119500810:web:8cd39e8f136b232bda47f3",
  "storageBucket": "digital-emporium-l6iku.firebasestorage.app",
  "apiKey": "AIzaSyBS4DRBmHVLVCRFGjKzN4lSoRVvLLmmeV0",
  "authDomain": "digital-emporium-l6iku.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "852119500810"
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}


export { firebaseApp };
