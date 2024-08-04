// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { EXPO_FIREBASE_API_KEY } from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: EXPO_FIREBASE_API_KEY,
  authDomain: "ai-travel-planner-app-c6ad2.firebaseapp.com",
  projectId: "ai-travel-planner-app-c6ad2",
  storageBucket: "ai-travel-planner-app-c6ad2.appspot.com",
  messagingSenderId: "144165553226",
  appId: "1:144165553226:web:dc0f232c6001db9c1152b3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
