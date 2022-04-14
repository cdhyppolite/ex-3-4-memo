/**
 * Formater les objets 'timestamp' de Firestore pour obtenir une date formatée.
 * @param {Object} d Objet 'timestamp' retourné par Firestore
 * @returns {string} date formatée en français dans le format suivant : 
 *                      3 décembre 1987 à 05:53:08
 */
 export default function formaterDateEtHeure(d) {
  //  L'objet contient le temps en 'secondes'
  const dateJs = d ? new Date(d.seconds*1000) : new Date();

  // Finalement les 2 fonctions toLocaleDateString et toLocaleTimeString donnent de bons résultats ;-)
  return dateJs.toLocaleDateString("fr-CA", {year: 'numeric', month: 'long', day: 'numeric'}) 
          + ' à ' 
          + dateJs.toLocaleTimeString("en-CA", {hour12: false});
}