// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCD87_1MzXb6Kr1tA2fuWqHuMcnsthQiOI",
  authDomain: "kapdaswag.firebaseapp.com",
  databaseURL: "https://kapdaswag-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kapdaswag",
  storageBucket: "kapdaswag.appspot.com", // ✅ Correct format
  messagingSenderId: "519558713442",
  appId: "1:519558713442:web:f93bfc7b92e5e146d5413b",
  measurementId: "G-CRHHCL0K87"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore DB
export const db = getFirestore(app);
