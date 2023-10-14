import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import {
  EXPO_PUBLIC_API_KEY,
  EXPO_PUBLIC_AUTH_DOMAIN,
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_STORAGE_BUCKET,
  EXPO_PUBLIC_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_APP_ID,
} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: EXPO_PUBLIC_API_KEY,
  authDomain: EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: EXPO_PUBLIC_PROJECT_ID,
  storageBucket: EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: EXPO_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { fireStore, storage, auth };

