// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb4lGzFJToa-jGjim0TeQLACSECw09ZE0",
  authDomain: "vue-3-2025-ab020.firebaseapp.com",
  projectId: "vue-3-2025-ab020",
  storageBucket: "vue-3-2025-ab020.firebasestorage.app",
  messagingSenderId: "648315401689",
  appId: "1:648315401689:web:b0ca3239df05faa1f2d5c8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
