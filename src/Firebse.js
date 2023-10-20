// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
 

const firebaseConfig = {
  apiKey: "AIzaSyDjuvIBSozsDLsKhIDBJxUJ_alJ3oeHJxc",
  authDomain: "exp2-89265.firebaseapp.com",
  projectId: "exp2-89265",
  storageBucket: "exp2-89265.appspot.com",
  messagingSenderId: "797878942217",
  appId: "1:797878942217:web:a87f2272575c840c5616d8",
  measurementId: "G-LB3QH5TVFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore(app);