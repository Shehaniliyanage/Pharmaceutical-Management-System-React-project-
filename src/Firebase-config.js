import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmdrNPyCKfJ_txvi_b1PBigfhLON_6ZZE",
  authDomain: "jayasiri-pharmacy.firebaseapp.com",
  databaseURL: "gs://jayasiri-pharmacy.appspot.com",
  projectId: "jayasiri-pharmacy",
  storageBucket: "jayasiri-pharmacy.appspot.com",
  messagingSenderId: "667248132010",
  appId: "1:667248132010:web:05b9d38c51f06dfd62b5d3",
  measurementId: "G-WKQHMMMVDX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const facebookProvider = new FacebookAuthProvider(app);
export const twitterProvider = new TwitterAuthProvider(app);

export const db = getFirestore(app);

export const storage = getStorage(app);