// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9hkHVTUDC1nRJi9YiM0nY63_-0Z4BFvI",
  authDomain: "picture-marketplace-eb4da.firebaseapp.com",
  projectId: "picture-marketplace-eb4da",
  storageBucket: "picture-marketplace-eb4da.appspot.com",
  messagingSenderId: "679477266832",
  appId: "1:679477266832:web:54ceb3099ae6dd70680b15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;