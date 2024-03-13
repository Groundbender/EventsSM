import { initializeApp } from "firebase/app";

// 1 добавляем импорты для firestore
import "firebase/firestore"
import { getFirestore } from "firebase/firestore";
// auth
import "firebase/auth"
import { getAuth } from "firebase/auth";
// storage
import "firebase/storage"
import { getStorage } from "firebase/storage";
 // realtime database
import "firebase/database"
import { getDatabase } from "firebase/database";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";


declare global {
  
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "events-social-media.firebaseapp.com",
  projectId: "events-social-media",
  storageBucket: "events-social-media.appspot.com",
  messagingSenderId: "338711359481",
  appId: "1:338711359481:web:55daed468ed84f75b6d728",
  // realtime database
  databaseURL: "https://events-social-media-default-rtdb.europe-west1.firebasedatabase.app",
};

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// app check
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LeKQpQpAAAAALkFXe78bYe5gwClnuwsalqqsA9B'),
  isTokenAutoRefreshEnabled: true
})


// 2 добавляем getFirestore, можно импортировать lite версию с меньшим количеством функций
//firestore
export const db = getFirestore(app)
// firebase auth
export const auth = getAuth(app)
// firebase storage
export const storage = getStorage(app)   
export const fb = getDatabase(app)