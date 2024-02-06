import { React, useState, useContext } from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";
import AuthContext from "../Components/AuthContext";
import Auth from "../Services/Auth";
import { toast } from 'react-toastify';
import MenuBurger from "../assets/icons8-menu-64.png";

const Auth0 = new Auth();
const NavBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isActiveLink, setIsActiveLink] = useState(false);
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
    const closeMenu = ()=>{setIsActiveLink(false)};
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
    <div className={isActiveLink ? "container_nav active" : 'container_nav'}>
        <div className="bouton">
            <Link to={"/"} className='btn_nav' onClick={closeMenu}>Accueil</Link>
            <Link to={"/taverne"} className='btn_nav' onClick={closeMenu}>Taverne</Link>
            <Link to={"/contact"} className='btn_nav' onClick={closeMenu}>Contact</Link>
        </div>
        <div className="titre">
            <h1>Roleverse</h1>
        </div>
        <div className="connexion">
            {isAuthenticated === false? 
                <></> : <Link to={"/profil"} className='btn_nav' onClick={closeMenu}>Profil</Link>}
            {isAuthenticated === false ? <>
            <Link to={"/connexion"} className='btn_nav' onClick={closeMenu}>Connexion</Link>
          </> :
            <Link className='btn_nav' onClick={()=>{setIsAuthenticated(false); Auth0.logout(
                toast.info("A bientôt aventurier", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })
            )}} >Déconnexion</Link>
          }
        </div>
    </div>
    </navbar>
)};

export default NavBar;