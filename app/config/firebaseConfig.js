import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDw8nuExhIcui47Alka8CMrQDKt65P65vs",
  authDomain: "trashcash-app.firebaseapp.com",
  databaseURL: "https://trashcash-app-default-rtdb.firebaseio.com/",
  projectId: "trashcash-app",
  storageBucket: "trashcash-app.appspot.com",
  messagingSenderId: "788333132323",
  appId: "1:788333132323:android:9b9b907fda756ea4ee8f96",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence (using AsyncStorage)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Realtime Database
const database = getDatabase(app);

// Export the initialized services
export { auth, database };
