import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBD9jYXStgdYvNe-ymhrnQ7e5GmDqsMRV4",
  authDomain: "medease1.firebaseapp.com",
  projectId: "medease1",
  storageBucket: "medease1.appspot.com",
  messagingSenderId: "531120249204",
  appId: "1:531120249204:web:fc8f36ca792adce87df421",
  measurementId: "G-Q3BYHW6302"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
