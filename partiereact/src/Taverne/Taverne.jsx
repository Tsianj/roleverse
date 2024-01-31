import { React, useContext, useState } from 'react';
import "./Taverne.css";
import scenario1 from "../assets/scenario1.png";
import scenario2 from "../assets/Dragon.png";
import prochainement from "../assets/Prochainement1.png"
import { Link } from "react-router-dom";
import Image from './taverneService';
import AuthContext from "../Components/AuthContext";
import Auth from "../Services/Auth";

const Taverne = () => {
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
    const [images, setImages] = useState();

    return ( <div  className='taverne'>
        <div className='tav'>
            <p className='titre_tav'>Taverne</p>
            <p className='para_tav'>
                Entrez dans la Taverne de RoleVerse, où les aventures prennent vie ! Explorez notre collection de scénarios captivants, prêts à être découverts par des héros intrépides comme vous. Que vous soyez en quête de mystères à résoudre, de monstres à combattre ou d'intrigues à dénouer, la Taverne regorge de récits palpitants pour tous les goûts. Choisissez votre aventure, rassemblez vos compagnons de jeu et plongez dans des univers riches en défis et en récompenses. La Taverne de RoleVerse, où chaque histoire attend d'être écrite par votre courage et votre ingéniosité.
            </p>
        </div>
        {isAuthenticated === false? 
        <div className='noConn'>Nous comprenons que tu es pressé de partir à l'aventure, mais avant 
        <Link to={"/connexion"} className='connTav'> connecte toi</Link> et nous serons ravis de te présenter nos scénarios.</div> :
        <div className='card_scenar'>
            <img src={scenario1} alt="image scénario" className='img_scenar' />
            <img src={scenario2} alt="image scénario" className='img_scenar' />
            <img src={prochainement} alt="prochainement" className='en_cours' />
            <img src={prochainement} alt="prochainement" className='en_cours' />
        </div>
}
    </div> );
}
 
export default Taverne;