// FirebaseProvider.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBD9jYXStgdYvNe-ymhrnQ7e5GmDqsMRV4",
  authDomain: "medease1.firebaseapp.com",
  projectId: "medease1",
  storageBucket: "medease1.appspot.com",
  messagingSenderId: "531120249204",
  appId: "1:531120249204:web:fc8f36ca792adce87df421",
  measurementId: "G-Q3BYHW6302"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, analytics, auth, db};