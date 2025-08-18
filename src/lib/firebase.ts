'use client';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
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
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
