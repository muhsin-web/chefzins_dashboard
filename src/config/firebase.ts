// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVC3o7_Eb3qSsKEap6yAny8vP-rYlqri0",
  authDomain: "chefzin-b5b5e.firebaseapp.com",
  projectId: "chefzin-b5b5e",
  storageBucket: "chefzin-b5b5e.appspot.com",
  messagingSenderId: "487482796420",
  appId: "1:487482796420:web:c5bed2e2647c6d669bd5d1",
  measurementId: "G-FNELMZEEW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);