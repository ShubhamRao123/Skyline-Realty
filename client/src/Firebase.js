// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "housing-estate-ab4ee.firebaseapp.com",
  projectId: "housing-estate-ab4ee",
  storageBucket: "housing-estate-ab4ee.appspot.com",
  messagingSenderId: "208505411083",
  appId: "1:208505411083:web:20596b4cd46080b986d90e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
