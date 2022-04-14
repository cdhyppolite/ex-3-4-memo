import './Tache.scss';
// La fonction formaterDateEtHeure est exportée par défaut dans le fichier util.js
// c'est la raison pour laquelle on peut l'importer sans les accolades {} ;-)
import formaterDateEtHeure from '../code/util';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Tache({id, nom, fini, date}) {
  let etat = "Tache";
  if (fini==true) etat += " completee";
  return (
    <div className={etat}>
      <IconButton color="success" className='btn-padding-reduit-gauche'>
        <CheckCircleIcon />
      </IconButton>
      <span className="texte">{nom}</span>
      <span className="date">({formaterDateEtHeure(date)})</span>
      <IconButton color="error" className='btn-padding-reduit-droite'>
        <RemoveCircleIcon />
      </IconButton>
    </div>
  );
}