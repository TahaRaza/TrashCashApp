// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDw8nuExhIcui47Alka8CMrQDKt65P65vs",
  authDomain: "trashcash-app.firebaseapp.com",
  projectId: "trashcash-app",
  messagingSenderId: "788333132323",
  appId: "1:788333132323:android:9b9b907fda756ea4ee8f96",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence (using AsyncStorage)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
