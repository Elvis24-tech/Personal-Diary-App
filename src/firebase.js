import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5YR-ztxGsRiyuEmWMwBrC92qkyqY_6C0",
  authDomain: "diary-app-59c1c.firebaseapp.com",
  projectId: "diary-app-59c1c",
  storageBucket: "diary-app-59c1c.appspot.com",
  messagingSenderId: "187238380057",
  appId: "1:187238380057:web:8c7c8c3cab3e05df093088"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
};