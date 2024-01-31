import { React, useState, useContext } from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";
import AuthContext from "../Components/AuthContext";
import Auth from "../Services/Auth";
import { toast } from 'react-toastify';

const NavBar = () => {
    const [isActive, setIsActive] = useState(false);
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
return (
    <div className='container_nav'>
        <div className='bouton'>
            <Link to={"/"} className='btn_nav'>Accueil</Link>
            <Link to={"/taverne"} className='btn_nav'>Taverne</Link>
            <Link to={"/contact"} className='btn_nav'>Contact</Link>
        </div>
        <div className='titre'>
            <h1>Roleverse</h1>
        </div>
        <div className='connexion'>
            {isAuthenticated === false? 
                <></> : <Link className='btn_nav'>Profil</Link>}
            {isAuthenticated === false ? <>
            <Link to={"/connexion"} className='btn_nav'>Connexion</Link>
          </> :
            <Link className='btn_nav' onClick={()=>{setIsAuthenticated(false); Auth.logout(
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
            )}}>Déconnexion</Link>

          }
        </div>
    </div>
)};

export default NavBar;