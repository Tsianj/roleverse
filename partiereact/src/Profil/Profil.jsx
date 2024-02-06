import React, { useState } from 'react';
import './Profil.css';

const Profil = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [pseudo, setPseudo] = useState('Pseudo du joueur');
    const [bio, setBio] = useState('Description du joueur');
    const [niveauMJ, setNiveauMJ] = useState(3); // Exemple : niveau initial
    const [niveauJoueur, setNiveauJoueur] = useState(4); // Exemple : niveau initial
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = () => {
      setIsEditing(false);
      // Ajoutez ici la logique pour sauvegarder les modifications
      // (par exemple, en utilisant une fonction pour mettre à jour les données côté serveur)
    };
    const renderStars = (numStars, filledColor) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(
            <span
              key={i}
              role="img"
              aria-label="Star"
              style={{ color: i < numStars ? filledColor : 'white' }}
            >
              ⭐
            </span>
        );
        }
        return stars;
    };

    return (    
<div className="profil-container">
      <div className="profil-card">
        <div className="profil-image">
          {/* Image du joueur */}
        </div>
        <div className="profil-info">
          {isEditing ? (
            <>
              {/* Champs de modification pendant l'édition */}
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </>
          ) : (
            <>
              {/* Affichage normal */}
              <h2>{pseudo}</h2>
              <p className="profil-bio">{bio}</p>
            </>
          )}
        </div>
          {/* Niveaux MJ et joueur */}
        <div className="profil-niveaux">
          <div>
          <p className='p-profil'>Niveau MJ :</p>
            {renderStars(niveauMJ, 'rgba(149, 198, 35, 1)')}
          </div>
          <div>
            <p className='p-profil'>Niveau Joueur :</p>
            {renderStars(niveauJoueur, 'rgba(149, 198, 35, 1)')}
          </div>
        </div>
        <div className="profil-edit">
          {isEditing ? (
            <button onClick={handleSaveClick}>Enregistrer</button>
          ) : (
            <span
              role="img"
              aria-label="Modifier"
              className="edit-icon"
              onClick={handleEditClick}
            >
              ✏️
            </span>
          )}
        </div>
      </div>
    </div>
    );
}
 
export default Profil;