// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloudnest-1078a.firebaseapp.com",
  projectId: "cloudnest-1078a",
  storageBucket: "cloudnest-1078a.appspot.com",
  messagingSenderId: "81871479118",
  appId: "1:81871479118:web:868d19cc741bb0fe3f3e1f",
  measurementId: "G-3HF9G7N0Q0"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default {app}

export const app=initializeApp(firebaseConfig)