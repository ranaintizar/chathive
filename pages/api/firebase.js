import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0LrLoI9FQwuejm12mb9j1g3OyqwsMndc",
  authDomain: "airy-shadow-364605.firebaseapp.com",
  databaseURL: "https://airy-shadow-364605-default-rtdb.firebaseio.com",
  projectId: "airy-shadow-364605",
  storageBucket: "airy-shadow-364605.appspot.com",
  messagingSenderId: "540875195301",
  appId: "1:540875195301:web:1919d0222edeca3e81de4c",
  measurementId: "G-221T4RGPLY",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();
