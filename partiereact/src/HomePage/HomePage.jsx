import React from 'react';
import './HomePage.css';
import dice from '../assets/Dés_bienvenue.png';
import jdr from '../assets/JDR.jpg';
import question from '../assets/JDR_accueil.jpg';
import taverne from '../assets/Taverne.jpg';
import { Link } from "react-router-dom";


const HomePage = () => {
return (
    <div className="container_HP">
        <div className='header'>
            <img src={dice} alt="logo" className='dice' />
        </div>
        <div className='bienvenue'>
            <div className='bloc'>
                <div className='image1'>
                    <img src={jdr} alt="image jdr" className='img1'/>
                </div>
                <div className='texte1'>
                    <p className='p1'>Tu souhaites partir à l’aventure avec tes amis ? <span>Rejoins la communauté</span> et part à la recherche de trésors !</p>
                </div>
            </div>
            <div className='btn'>
            <Link to={"/connexion"} className='btn_accueil'>Rejoignez-nous</Link>
            </div>
        </div>
        <div className='question'>
            <div className='bloc2'>
                <div className='texte2'>
                    <p className='p2'><span>Qu’est ce que le jeu de rôle ? </span> Suis nous on va t’expliquer.</p>
                </div>
                <div className='image2'>
                    <img src={question} alt="image jdr" className='img2'/>
                </div>
            </div>
            <div className='btn'>
            <Link to={"/question"} className='btn_accueil'>En savoir plus</Link>
            </div>
        </div>
        <div className='taverne'>
            <div className='bloc3'>
                <div className='image3'>
                    <img src={taverne} alt="image jdr" className='img3'/>
                </div>
                <div className='texte3'>
                    <p className='p3'>Tu veux partir à l’aventure mais tu ne sais pas par où commencer ? <span>Viens à la Taverne</span>, des aventuriers te guideront vers de nouvelles quêtes.</p>
                </div>
            </div>
            <div className='btn'>
            <Link to={"/taverne"} className='btn_accueil'>Passez la porte</Link>
            </div>
        </div>
    </div>
)};

export default HomePage;
   