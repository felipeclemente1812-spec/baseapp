import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL7vERa2Kfgc7pvo1NM4e9J-ze2Ki_v90",
  authDomain: "tcc-2026-focus.firebaseapp.com",
  projectId: "tcc-2026-focus",
  storageBucket: "tcc-2026-focus.firebasestorage.app",
  messagingSenderId: "146572800245",
  appId: "1:146572800245:web:f40f562aa772da8bb415bc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
