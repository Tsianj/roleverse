import { React, useState, useContext } from "react";
import "../Styles/NavBar.css";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import Auth from "../Services/Auth";
import { toast } from "react-toastify";
import MenuBurger from "../assets/icons8-menu-64.png";
import { useNavigate } from "react-router-dom";

const Auth0 = new Auth();
const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveLink, setIsActiveLink] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(AuthContext);
  const closeMenu = () => {
    setIsActiveLink(false);
  };

  console.log(user);
  return (
    <navbar>
      {/* Icône du menu burger pour les écrans plus petits */}
      <img
        src={MenuBurger}
        alt="menu burger"
        className="menu_burger"
        // Gestion du clic pour activer/désactiver le menu burger
        onClick={() => {
          setIsActiveLink(!isActiveLink);
        }}
      />
      <div className={isActiveLink ? "container_nav active" : "container_nav"}>
        <div className="bouton">
          <Link to={"/"} className="btn_nav" onClick={closeMenu}>
            Accueil
          </Link>
          <Link to={"/taverne"} className="btn_nav" onClick={closeMenu}>
            Taverne
          </Link>
          <Link to={"/contact"} className="btn_nav" onClick={closeMenu}>
            Contact
          </Link>
        </div>
        <div className="titre">
          <h1>Roleverse</h1>
        </div>
        <div className="connexion">
          {isAuthenticated === false ? (
            <></>
          ) : (
            <Link
              to={`/profil/${user?.UT_Mail}`}
              className="btn_nav"
              onClick={closeMenu}
            >
              Profil
            </Link>
          )}
          {isAuthenticated === false ? (
            <>
              <Link to={"/connexion"} className="btn_nav" onClick={closeMenu}>
                Connexion
              </Link>
            </>
          ) : (
            <Link
              className="btn_nav"
              onClick={() => {
                setIsAuthenticated(false);
                Auth0.logout(
                  toast.info("A bientôt aventurier"));
                setTimeout(() => {
                  navigate("/");
                });
              }}
            >
              Déconnexion
            </Link>
          )}
        </div>
      </div>
    </navbar>
  );
};

export default NavBar;
