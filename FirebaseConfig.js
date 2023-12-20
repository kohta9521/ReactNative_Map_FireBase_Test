import { initializeApp } from "firebase/app";

// firestore
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDeNwCXF4u_AhRn2_2sjFdFClZA3www8Ug",
    authDomain: "map-simple-test.firebaseapp.com",
    projectId: "map-simple-test",
    storageBucket: "map-simple-test.appspot.com",
    messagingSenderId: "1044836430585",
    appId: "1:1044836430585:web:ef712aae6a2bfe9bb0a828",
    measurementId: "G-TP3WJRQW3C"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);