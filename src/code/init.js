import firebaseConfig from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

/**
 * Firebase
 */
// Initialiser Firebase
export const instanceFirebase = initializeApp(firebaseConfig);

/**
 * Firebase Authentication
 */
// Initialiser Firebase Authentication
export const authFirebase = getAuth();
// Initialiser l'authentification fédérée Google
export const authGoogle = new GoogleAuthProvider();


/**
 * Firestore
 */
// Initialiser Firestore
export const bdFirestore = getFirestore();
// Nom de la collection principale
export const collUtil = "memo";
// Nom de la sous-collection
export const collTaches = "taches";
