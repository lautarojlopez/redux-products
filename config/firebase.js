import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCU2OTGc_NA4bGxOw8WIvEy47LKTJOg6is",
  authDomain: "test-efe50.firebaseapp.com",
  projectId: "test-efe50",
  storageBucket: "test-efe50.appspot.com",
  messagingSenderId: "945505297394",
  appId: "1:945505297394:web:8968e3b3fd8dbd0081416b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

//Initialize firestore
export const db = getFirestore()