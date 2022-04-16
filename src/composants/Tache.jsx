import './Tache.scss';
// La fonction formaterDateEtHeure est exportée par défaut dans le fichier util.js
// c'est la raison pour laquelle on peut l'importer sans les accolades {} ;-)
import formaterDateEtHeure from '../code/util';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// Boite de dialogue
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';

export default function Tache({id, nom, fini, date, supprimerTache, modifierEtatTache}) {
  
  const [ouvert, setOuvert] = useState(null);

  function gererOuvert () {
    setOuvert(true);
  };
  function gererFermer () {
    setOuvert(false);
  };
  function gererEtat() {
    modifierEtatTache(id, fini);
  };

  function gererSupprimer() {
    gererFermer();
    supprimerTache(id);
  }

  return (
    <div className={'Tache '+(fini ?'completee' : '')}>
      <IconButton color="success" className='btn-padding-reduit-gauche'>
        <CheckCircleIcon onClick={gererEtat} />
      </IconButton>
      <span className="texte">{nom}</span>
      <span className="date">({formaterDateEtHeure(date)})</span>
      <IconButton color="error" className='btn-padding-reduit-droite'>
        <RemoveCircleIcon  onClick={gererOuvert}/>
      </IconButton>
      {/* Confirmation supression */}
      <Dialog
        open={ouvert}
        onClose={gererFermer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Voulez-vous vraiment supprimer cette tâche?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Elle sera perdue à jamais. Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererSupprimer} autoFocus> Supprimer </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}
// -----------------
