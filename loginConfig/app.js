// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1dgSwjHONDuaQeWqwdeoG8L2gheKGVDI",
  authDomain: "login-70e58.firebaseapp.com",
  databaseURL: "https://login-70e58-default-rtdb.firebaseio.com",
  projectId: "login-70e58",
  storageBucket: "login-70e58.appspot.com",
  messagingSenderId: "271490799577",
  appId: "1:271490799577:web:ffcf8e33b59c6a4b78abc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
