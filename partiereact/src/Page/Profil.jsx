import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Profil.css";
import profilService from "../Services/utilisateurService";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../Components/AuthContext";

const Profil = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const { email } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleSaveClick = async () => {
    try {
      // service pour mettre à jour les informations de l'utilisateur
      const response = await profilService.updateUtilisateur({
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
  const handleDeleteClick = () => {
    setShow(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      console.log("test");
      await profilService.deleteUtilisateur(user.UT_Mail).then((resp) => {
        setShow(false);
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");
        window.location.href = "/";
      });
    } catch (error) {
      console.log("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await profilService.fetchUtilisateur(email);
      setUser(response.data[0]);
    } catch (error) {
      console.log("Erreur lors de la récupération du pseudo :", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profil-container">
      <div className="profil-card">
        <div className="profil-image">{/* Image du joueur */}</div>
        <div className="profil-info">
          {isEditing ? (
            <div className="modif-profil">
              {/* Champs de modification pendant l'édition */}
              <h2 className="orange">Pseudo :</h2>
              <input
                type="text"
                value={
                  (user?.UT_Nom || "").charAt(0).toUpperCase() +
                  (user?.UT_Nom || "").slice(1)
                }
                onChange={(e) => setUser({ ...user, UT_Nom: e.target.value })}
              />
              <br />
              <br />
              <p className="profil-bio">Bio :</p>
              <textarea
                value={user.UT_Bio}
                onChange={(e) => setUser({ ...user, UT_Bio: e.target.value })}
              />
              <br />
              <br />
              <p className="p-profil">Niveau MJ :</p>
              <select
                value={user.UT_NiveauMJ}
                onChange={(e) =>
                  setUser({ ...user, UT_NiveauMJ: e.target.value })
                }
              >
                <option value=""></option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Expert">Expert</option>
              </select>
              <br />
              <br />
              <p className="p-profil">Niveau Joueur :</p>
              <select
                value={user.UT_NiveauJoueur}
                onChange={(e) =>
                  setUser({ ...user, UT_NiveauJoueur: e.target.value })
                }
              >
                <option value=""></option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          ) : (
            <>
              {/* Affichage normal */}
              <h2 className="orange">Pseudo : </h2>
              <h2 className="white">
                {(user?.UT_Nom || "").charAt(0).toUpperCase() +
                  (user?.UT_Nom || "").slice(1)}
              </h2>
              <p className="profil-bio">Bio : </p>
              <p className="p-texteProfil">{user.UT_Bio}</p>
              {/* Niveaux MJ et joueur */}
              <div className="profil-niveaux">
                <div>
                  <p className="p-profil">Niveau MJ : </p>
                  <p className="p-texteProfil">{user.UT_NiveauMJ}</p>
                </div>
                <div>
                  <p className="p-profil">Niveau Joueur :</p>
                  <p className="p-texteProfil">{user.UT_NiveauJoueur}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="profil-edit">
          {isEditing ? (
            <button className="valider" onClick={handleSaveClick}>
              Enregistrer
            </button>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={handleEditClick}
                className="edit-icon"
              >
                ✏️
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteClick}
                title="Supprimer le compte"
                className="delete-icon"
              >
                🗑️
              </Button>
            </>
          )}
        </div>
        {/* Modal de confirmation de suppression */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Suppression de compte</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Etes-vous sûr de vouloir supprimer votre compte?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteConfirmed();
              }}
            >
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Profil;
