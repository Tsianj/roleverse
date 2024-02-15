import React, { useState, useContext, useEffect } from "react";
import Auth from "../Services/Auth";
import AuthContext from "../Components/AuthContext";
import "../Styles/Connexion.css";
import utilisateurService from "../Services/utilisateurService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const Auth0 = new Auth();
const Connexion = () => {
  const [isActive, setIsActive] = useState(false);
  const [utilisateur, setUtilisateur] = useState({});
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated, user } = useContext(AuthContext);
  // Fonction pour stocker le token dans le stockage local
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  const [capVal, setCapVal] = useState(null)
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setUtilisateur({ ...utilisateur, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (utilisateur.passwords === utilisateur.password_verif) {
      try {
        utilisateurService.addUtilisateur(utilisateur).then(async () => {
          const res = await utilisateurService.loginUtilisateur({
            mailConn_uti: utilisateur.mail_uti,
            passwordsConn: utilisateur.passwords,
          });
          setTimeout(async () => {
            console.log(res);
            // setUser(Auth0.getUser());
            // setIsAuthenticated(true);
            toast.success(
              "Bienvenu aventurier " + res.data.user.UT_Nom.charAt(0).toUpperCase() +
              res.data.user.UT_Nom.slice(1) + ", ton compte a bien été créé. Connecte-toi ! " ,
              {
                position: "bottom-right",
                autoClose: 1700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          });
          setTimeout(() => {
            window.location.href = "/connexion";
          }, 2000);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Veuillez vérifier la confirmation du mot de passe");
    }
  };

  const handleConn = async (e) => {
    e.preventDefault();
    try {
      const response = await utilisateurService.loginUtilisateur(utilisateur);
      setTimeout(() => {
        setUser(Auth0.getUser());
        console.log(user);
        setIsAuthenticated(true);
        // Stocker le token lors de la connexion réussie
        storeToken(response.data.access_token);
        toast.success("Bon retour parmi nous " + response.data.user.UT_Nom.charAt(0).toUpperCase()
        + response.data.user.UT_Nom.slice(1), {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1800);
    } catch (e) {
      toast.error(e.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    // Vérifier la présence d'un token au chargement de la page
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Si un token est trouvé, définissez l'utilisateur et l'authentification
      setUser(Auth0.getUser());
      setIsAuthenticated(true);
    }
  }, []); // Déclenché uniquement lors du montage initial

  return (
    <>
      <div className="body">
        <div
          className={isActive ? "container active" : "container"}
          id="container"
        >
          {/* <!-- Formulaire d'inscription --> */}
          <div className="form-container sign-up">
            <form method="POST" onSubmit={handleAdd}>
              <h1>Inscription</h1>
              {/* <!-- Champs pour entrer le nom, l'email et le mot de passe --> */}
              <input
                type="text"
                name="nom_uti"
                placeholder="Pseudo"
                value={utilisateur.nom_uti}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="mail_uti"
                placeholder="Adresse mail"
                value={utilisateur.mail_uti}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="passwords"
                placeholder="Mot de passe"
                value={utilisateur.passwords}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password_verif"
                placeholder="Confirmation mot de passe"
                value={utilisateur.password_verif}
                onChange={handleChange}
                required
              />
              <ReCAPTCHA  sitekey="6Ledr3MpAAAAAEsddoaIGdvPx5fvQQSf2huUzj8E" onChange={val => setCapVal(val)}/>
              <button type="submit" disabled={!capVal}>S'incrire</button>
            </form>
          </div>
          {/* <!-- Formulaire de connexion --> */}
          <div className="form-container sign-in">
            <form onSubmit={handleConn}>
              <h1>Connexion</h1>
              {/* <!-- Champs pour entrer l'email et le mot de passe --> */}
              <input
                type="email"
                name="mailConn_uti"
                placeholder="Adresse mail"
                value={utilisateur.mailConn_uti}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="passwordsConn"
                placeholder="Mot de passe"
                value={utilisateur.passwordsConn}
                onChange={handleChange}
                required
              />
              <ReCAPTCHA  sitekey="6Ledr3MpAAAAAEsddoaIGdvPx5fvQQSf2huUzj8E" onChange={val => setCapVal(val)}/>
              <button type="submit" value="Se connecter" onClick={handleConn} disabled={!capVal}>
                Se connecter
              </button>
            </form>
          </div>
          {/* <!-- Conteneur pour basculer entre les formulaires --> */}
          <div className="toggle-container">
            <div className="toggle">
              {/* <!-- Panneau pour le formulaire de connexion --> */}
              <div className="toggle-panel toggle-left">
                <h1 className="titre-form">Bon Retour!</h1>
                <p>
                  Content de te revoir parmi nous. Prêt pour d’autres aventures
                  ?
                </p>
                <button
                  className="hidden"
                  id="login"
                  onClick={() => {
                    setIsActive(false);
                  }}
                >
                  Se connecter
                </button>
              </div>
              {/* <!-- Panneau pour le formulaire d'inscription --> */}
              <div className="toggle-panel toggle-right">
                <h1 className="titre-form">Bienvenue</h1>
                <p>
                  Première aventure ? Inscris toi pour commencer ton périple et
                  vitre des moment passionnant
                </p>
                <button
                  className="hidden"
                  id="register"
                  onClick={() => {
                    setIsActive(true);
                  }}
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connexion;
