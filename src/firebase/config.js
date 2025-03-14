import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBphcLlGQTOo0I6i2luoYb2ddbbEGAN4tw",
  authDomain: "aylinncarre.firebaseapp.com",
  projectId: "aylinncarre",
  storageBucket: "aylinncarre.firebasestorage.app",
  messagingSenderId: "554327896193",
  appId: "1:554327896193:web:122f3231ff496cf6db5d80",
  measurementId: "G-X893NWEW0P"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };