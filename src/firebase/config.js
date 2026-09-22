import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkQFZTePEGiqfq7yCjUqAPk6OhXoZZcjg",
  authDomain: "manual-firebase-dbb77.firebaseapp.com",
  projectId: "manual-firebase-dbb77",
  storageBucket: "manual-firebase-dbb77.firebasestorage.app",
  messagingSenderId: "65532153607",
  appId: "1:65532153607:web:d7546ac47e02ceac443fa2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);