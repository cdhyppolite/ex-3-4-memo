import { authFirebase, authGoogle } from './init';
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, collection, setDoc, addDoc } from "firebase/firestore"; 
import { bdFirestore, collUtil, collTaches } from './init';

/**
 * Ouvrir une connexion avec le fournisseur d'authentification fédéré par défaut
 * @returns {Promise} promesse contenant un objet UserCredentials (ou erreur).
 */
export function connexion() {
  return signInWithPopup(authFirebase, authGoogle);
}

/**
 * Observer les changements de connexion dans Firebase Auth pour valider 
 * l'état de l'utilisateur connecté
 * @param {Function} mutateurEtatUtil fonction de mutation de l'état utilisateur
 * @returns {Function} Fonction qui annule le gestionnaire d'événement
 */
export function observerConnexion(mutateurEtatUtil) {
  onAuthStateChanged(authFirebase, util => {
    // On fait la mutation de l'état utilisateur
    mutateurEtatUtil(util);
    // Si un utilisateur est connecté ...
    if(util) {
      // ... on créé son profil dans la collection Firestore au besoin
      creerProfil(util.uid, util.displayName, util.email);
    }
  });
}

/**
 * Créer un profil d'utilisateur s'il n'y en pas un ; fusionner le profil sinon
 * @param {string} id Identifiant Firebase de l'utilisateur connecté
 * @param {string} nom Nom de l'utilisateur
 * @param {string} courriel Adresse courriel de l'utilisateur
 */
export async function creerProfil(id, nom, courriel) {
  await setDoc(
          doc(bdFirestore, collUtil, id), 
          {nom: nom, courriel: courriel}, 
          {merge: true}
        );
}

/**
 * Déconnecter l'utilisateur de Firebase Auth
 */
export function deconnexion() {
  signOut(authFirebase);
}