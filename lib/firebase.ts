import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCciKXB6BWx-JFDcKzulbOTYK0HeDenCUg",
  authDomain: "critical-care-cuts.firebaseapp.com",
  projectId: "critical-care-cuts",
  storageBucket: "critical-care-cuts.firebasestorage.app",
  messagingSenderId: "482990764478",
  appId: "1:482990764478:web:7c2085a5d8b80e5cad89ef",
  measurementId: "G-6GTY6PGWZC"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
