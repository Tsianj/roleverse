import React, { useState, useEffect, useContext } from 'react';
import '../Styles/Profil.css';
import profilService from '../Services/utilisateurService'
import { useParams } from 'react-router-dom';

const Profil = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({});
    const [niveauMJ, setNiveauMJ] = useState(3); // Exemple : niveau initial
    const [niveauJoueur, setNiveauJoueur] = useState(4); // Exemple : niveau initial
    const { email } = useParams();

    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = async () => {
      try {
        // service pour mettre à jour les informations de l'utilisateur
        const response = await profilService.updateUtilisateur( {
          UT_Mail: user.UT_Mail,
          UT_Nom: user.UT_Nom,
          UT_Bio: user.UT_Bio,
          UT_NiveauMJ: user.UT_NiveauMJ,
          UT_NiveauJoueur: user.UT_NiveauJoueur,
        });
        setIsEditing(false);
      } catch (error) {
        console.log("Erreur lors de la sauvegarde des modifications :", error);
      }
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
        setUser(response.data[0]);
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
                value={(user?.UT_Nom || '').charAt(0).toUpperCase() + (user?.UT_Nom || '').slice(1)}
                onChange={(e) => setUser({ ...user, UT_Nom: e.target.value })}
              /> <br />
              <textarea
                value={user.UT_Bio}
                onChange={(e) => setUser({ ...user, UT_Bio: e.target.value })}
              />
            </>
          ) : (
            <>
              {/* Affichage normal */}
              <h2>Pseudo : {(user?.UT_Nom || '').charAt(0).toUpperCase() + (user?.UT_Nom || '').slice(1)}</h2>
              <p className="profil-bio">Bio : {user.UT_Bio}</p>
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
              title="Modifier"
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