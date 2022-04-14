import Tache from './Tache';
import './Taches.scss';
import * as tacheModele from '../code/tache-modele';
import { useState, useEffect } from 'react';

export default function Taches({etatTaches, utilisateur}) {
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;

  /**
   * On cherche les tâches une seule fois après l'affichage du composant
   */
  useEffect(() => 
    tacheModele.lireTout(uid).then(
      taches => setTaches(taches)
    )
  , [setTaches, uid]);

  /**
   * Gérer le formulaire d'ajout de nouvelle tâche en appelant la méthode 
   * d'intégration Firestore appropriée, puis actualiser les tâches en faisant 
   * une mutation de l'état 'taches'.
   * @param {string} uid Identifiant Firebase Auth de l'utilisateur connecté
   * @param {Event} e Objet Event JS qui a déclenché l'appel
   */
  function gererAjoutTache(uid, e) {
    // Prévenir le formulaire d'être soumit (et de faire une requête HTTP 
    // qui causerait une actualisation de la page !!!)
    e.preventDefault();
    // Récupérer la valeur de la boîte de texte
    const texte = e.target.texteTache.value;
    // Si le texte est vide, oublie ça ;-)
    if(texte.trim() !== '') {
      // Bonne idée : vider le formulaire pour la prochaine tâche
      e.target.reset();
      // Insérer la tâche dans Firestore
      tacheModele.creer(uid, {nom: texte, fini: false}).then(
        // Actualiser l'état des taches en remplaçant le tableau des taches par 
        // une copie du tableau auquel on joint la tâche qu'on vient d'ajouter 
        // dans Firestore (et qui est retournée par la fonction creer()).
        tache => setTaches([tache, ...taches])
      );
    }
  }

  return (
    <section className="Taches">
      <form onSubmit={e => gererAjoutTache(uid, e)}>
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          autoFocus={true} 
        />
      </form>
      <div className="titre-liste-taches">
        <span className="texte">Tâche</span>
        <span className="date">Date d'ajout</span>
      </div>
      <div className="liste-taches">
        {
          taches.map(tache => <Tache key={tache.id} {... tache} />)
        }
      </div>
    </section>
  );
}