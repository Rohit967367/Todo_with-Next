import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.API_ID,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
// console.log(db);
// console.log(app);
// const auth = getAuth();
// const provider = new GoogleAuthProvider();

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
