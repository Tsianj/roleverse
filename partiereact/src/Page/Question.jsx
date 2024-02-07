import React from 'react';
import "../Styles/Question.css";
import imgHaut from "../assets/MJ_jdr.jpg";
import imgBas from "../assets/background.jpg";

const Question = () => {
    return ( 
        <div className="question_page">
            <div className='titre_q'>
                <p className='p_titre'>Le jeux de rôles c’est quoi ?</p>
            </div>
            <div className='container_q'>
                <div className='haut'>
                    <img src={imgHaut} alt="image jdr" className='img_haut' />
                    <p className='para_droite'>Les jeux de rôles (JDR) sont des expériences narratives interactives où les participants, souvent appelés "joueurs", endossent le rôle de personnages fictifs dans un univers imaginaire. Un "maître du jeu" (MJ) guide l'histoire, présentant des scénarios, des personnages et des défis, tout en laissant aux joueurs la liberté de prendre des décisions.
                    L'essence des JDR réside dans la création d'une histoire collaborative. Chaque joueur incarne un personnage doté de traits distinctifs tels que race, classe, compétences, et antécédents. Les actions des joueurs sont déterminées par des jets de dés, qui ajoutent une composante de hasard à l'histoire.
                    Le MJ agit comme conteur, décrivant le monde autour des joueurs, introduisant des personnages non joueurs (PNJ) et réagissant aux choix des joueurs. Ces choix peuvent influencer le déroulement de l'histoire et conduire à des résultats variés.
                    </p>
                </div>
                <div className='bas'>
                <p className='para_gauche'>Les JDR offrent une liberté créative sans pareille. Les joueurs peuvent explorer des mondes fantastiques, résoudre des mystères, combattre des créatures mythiques, ou même participer à des intrigues politiques. L'accent est mis sur l'imagination et la coopération, créant des expériences uniques et mémorables à chaque session.</p>
                    <img src={imgBas} alt="image paysage fantasy" className='img_bas'/>
                </div>
            </div>
        </div>
     );
}
 
export default Question;