// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiHn-u2QljMc452a1tLKZtarnWAeUe5g0",
  authDomain: "crud-auth-37ab0.firebaseapp.com",
  projectId: "crud-auth-37ab0",
  storageBucket: "crud-auth-37ab0.appspot.com",
  messagingSenderId: "745682588439",
  appId: "1:745682588439:web:a4bfe4cccae0eb0d0b1d52"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);