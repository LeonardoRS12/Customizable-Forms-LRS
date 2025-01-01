import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACj36A2nLVt17A-tJJq1F0OqZ8rVApbWs",
    authDomain: "customizable-forms-6cd02.firebaseapp.com",
    projectId: "customizable-forms-6cd02",
    storageBucket: "customizable-forms-6cd02.appspot.com",
    messagingSenderId: "515831859340",
    appId: "1:515831859340:web:41be33fb612643dad813a9",
    measurementId: "G-YJG6WNES5J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };