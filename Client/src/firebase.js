// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAdyQiDw7P-ykTNMH9gn6N7DlhyFnk_jA",
  authDomain: "lostandfound-e9d2a.firebaseapp.com",
  projectId: "lostandfound-e9d2a",
  storageBucket: "lostandfound-e9d2a.appspot.com",
  messagingSenderId: "1033291566684",
  appId: "1:1033291566684:web:99e4a1746b10a287f0e099",
  measurementId: "G-XW800TR0L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;