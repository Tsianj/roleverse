import React, { useState, useEffect } from 'react';
import '../Styles/Profil.css';
import profilService from '../Services/utilisateurService'
import { useParams } from 'react-router-dom';

const Profil = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [pseudo, setPseudo] = useState([]);
    const [bio, setBio] = useState([]);
    const [niveauMJ, setNiveauMJ] = useState(3); // Exemple : niveau initial
    const [niveauJoueur, setNiveauJoueur] = useState(4); // Exemple : niveau initial
    const { email } = useParams();
    

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

    const fetchData = async () => {
      try {
        const response = await profilService.fetchUtilisateur(email);
        console.log(response);
        setPseudo(response.data[0]);
      } catch (error) {
        console.log("Erreur lors de la récupération du pseudo :", error);
      }}
      useEffect(() => {
        fetchData();
      }, []);


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
                value={pseudo.UT_Nom.charAt(0).toUpperCase() + pseudo.UT_Nom.slice(1)}
                onChange={(e) => setPseudo(e.target.value)}
              /> <br />
              <textarea
                value={bio.UT_Description}
                onChange={(e) => setBio(e.target.value)}
              />
            </>
          ) : (
            <>
              {/* Affichage normal */}
              <h2>Pseudo : {pseudo.UT_Nom}</h2>
              <p className="profil-bio">Bio : {bio.UT_Description}</p>
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