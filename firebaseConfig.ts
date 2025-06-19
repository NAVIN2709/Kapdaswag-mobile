// firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence,getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD87_1MzXb6Kr1tA2fuWqHuMcnsthQiOI",
  authDomain: "kapdaswag.firebaseapp.com",
  projectId: "kapdaswag",
  storageBucket: "kapdaswag.appspot.com",
  messagingSenderId: "519558713442",
  appId: "1:519558713442:web:f93bfc7b92e5e146d5413b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (error) {
  console.log("Error initializing auth:", error);
  auth = getAuth(app); // fallback to default auth if initialization fails
}

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };