import { initializeApp } from "firebase/app";

// 1 добавляем импорты для firestore
import "firebase/firestore"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "events-social-media.firebaseapp.com",
  projectId: "events-social-media",
  storageBucket: "events-social-media.appspot.com",
  messagingSenderId: "338711359481",
  appId: "1:338711359481:web:55daed468ed84f75b6d728"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// 2 добавляем getFirestore, можно импортировать lite версию с меньшим количеством функций
export const db = getFirestore(app)