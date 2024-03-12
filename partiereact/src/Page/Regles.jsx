import React, { useEffect, useState } from 'react';
import '../Styles/Regles.css';
import { Link } from 'react-router-dom';
import racesService from '../Services/racesService';

const Regles = () => {
    const [races, setRaces] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await racesService.fetchRaces();
          console.log(response);
          setRaces(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération de la race :", error);
        }
      };
  
      fetchData();
    }, []);

    return ( 
        <div className='regles'>
            <h1>Règles du jeu</h1>
            <div className='bienvenu'>
                <h2>Bienvenue dans l'univers du Royaume de Fargöth !</h2>
                <p>Notre système de règles unique, créé à partir d'une fusion de plusieurs JDR renommés, offre une expérience personnalisable et immersive pour tous les joueurs. Les Maîtres du Jeu (MJ) ont la liberté d'adapter les règles en fonction de leurs joueurs, créant ainsi des histoires épiques et mémorables.</p>
            </div>
            <div className='fiche'>
                <h2>Fiche Personnage :</h2>
                <p>La fiche personnage met l'accent sur la personnalisation. Répartissez vos 100 points entre sept statistiques, dont la Force, la Constitution, l'Adresse, l'Intelligence, la Perception, le Charisme et la Vitalité. La Vitalité, calculée à partir de la Force et de la Constitution, assure une expérience unique à chaque personnage.</p>
                <h3>Stats</h3>
                <p>Pour les stats, le personnage dispose des attributs suivants, chacun noté sur une échelle de 0 à 20, avec un total de 50 points à répartir :</p>
                <div className='liste-stats1'>
                    <ul>
                        <li>Force</li>
                        <li>Constitution</li>
                        <li>Adresse</li>
                        <li>Intelligence</li>
                        <li>Perception</li>
                        <li>Charisme</li>
                        <li>Vitalité</li>
                    </ul>
                </div>
                <p>La Vitalité est calculée comme suit : 20 (de base) + (Constitution x 2) + Force.</p>
                <p><em>Après chaque niveau, le joueur reçoit 2 points qu'il peut répartir entre les stats de son choix. Si ces points sont alloués à la Constitution ou à la Force, la Vitalité doit être recalculée en conséquence.</em></p>
                <h3>Explication des Stats</h3>
                <div className='expli-stats'>
                        <p><b>Force</b> : Représente la force physique du personnage, utilisée pour des actions comme soulever un rocher, casser une porte, etc...</p>
                        <p><b>Constitution</b> : Indique la résistance du corps. Un jet de Constitution est nécessaire pour évaluer les conséquences de certaines actions, telles que la consommation d'une potion étrange.</p>
                        <p><b>Adresse</b> : Dextérité et agilité du personnage, utilisées pour éviter des obstacles, réaliser des acrobaties, etc...</p>
                        <p><b>Intelligence</b> : Liée à la magie, mais également à la résolution d'énigmes, à la lecture de livres, etc...</p>
                        <p><b>Perception</b> : Capacité à détecter des ennemis, des pièges ou à s'orienter.</p>
                        <p><b>Charisme</b> : Mesure l'influence du personnage sur les autres, utilisée pour les négociations et autres interactions sociales.</p>
                </div>
                <h3>Inventaire</h3>
                <p>Le joueur commence avec les éléments suivants dans son sac de voyage :</p>
                <div className='liste-stats2'>
                    <ul>
                        <li>Gourde en cuir de 50 cl</li>
                        <li>Corde tressée de 2 mètres</li>
                        <li>Couteau de poche (non destiné aux combats)</li>
                        <li>Caquelon en fonte (récipient pour manger)</li>                
                        <li>Cuillère en bois</li>                
                        <li>Morceau de chandelle</li>                
                        <li>Briquet à amadou</li>                
                    </ul>
                </div>
                <h3>Économie</h3>
                <p>Le système monétaire utilise des pièces d'or, d'argent et de cuivre. Le joueur commence avec 10 pièces d'or, 80 pièces d'argent et 50 pièces de cuivre. Les conversions sont les suivantes : 100 pièces de cuivre = 1 pièce d'argent, 100 pièces d'argent = 1 pièce d'or.</p>
                <h3>Équipement</h3>
                <p>Chaque personnage peut porter une arme au corps à corps (CAC), une arme à distance et une armure. Les munitions de base pour les armes à distance sont illimitées. Les munitions spéciales doivent être définies par le Maître du Jeu (MJ).</p>
                <p>Des objets spéciaux peuvent également être équipés, offrant des bonus dans certaines situations. Par exemple, un mage peut utiliser un livre d'incantations pour bénéficier d'un bonus de +2 à ses jets de sorts.</p>
                <h3>Faire une Action</h3>
                <p>Lorsqu'un joueur souhaite effectuer une action, il doit lancer 1d20 et combiner le résultat avec la statistique correspondante à l'action.</p>
                <p>Le jeu utilise un système de difficulté, avec les niveaux suivants :</p>
                <div className='liste-stats3'>
                    <ul>
                        <li><b>Très Facile (10)</b></li>
                        <li><b>Facile (15)</b></li>
                        <li><b>Normal (20)</b> : Si la difficulté n'est pas spécifiée, elle est par défaut sur "Normal".</li>
                        <li><b>Compliqué (25)</b></li>
                        <li><b>Difficile (30)</b></li>
                        <li><b>Très Difficile (35)</b></li>
                        <li><b>Extrême (40)</b></li>
                    </ul>
                </div>
                <p>En d'autres termes, pour réussir une épreuve de difficulté "Difficile," le joueur doit obtenir un minimum de 30 sur son dé. Par exemple, si la statistique du joueur est de 10, il devra faire au moins 20 sur son jet (10 + 1D20 (20) = 30) pour réussir l'épreuve.</p>
                <p><em>Note : Une réussite critique (20) signifie que l'épreuve est réussie, même en cas de statistique faible. Cependant, cela ne garantit pas une réussite parfaite.</em></p>
                <h3>Avantages et Désavantages au Lancer de Dés</h3>
                <p>Dans certaines situations, un personnage peut bénéficier d'un avantage ou être confronté à un désavantage lors d'un jet de dés. Cela reflète des circonstances favorables ou défavorables qui influent sur la probabilité de réussite.</p>
                <p><b>Avantage</b> : Lorsqu'un personnage a un avantage, il lance deux dés et choisit le résultat le plus favorable. Pour obtenir un avantage, le MJ peut considérer des actions préparatoires, des compétences spéciales, ou d'autres facteurs propices.</p>
                <p><b>Désavantage</b> : À l'inverse, un personnage confronté à un désavantage lance deux dés et prend le résultat le moins favorable. Les désavantages peuvent découler de handicaps, de situations défavorables, ou d'actions précipitées.</p>
                <p><b>Jet Standard</b> : En l'absence d'avantage ou de désavantage, le personnage lance un seul dé pour déterminer le résultat.</p>
                <p><em>Exemple : Imaginons qu'un aventurier veuille escalader une paroi rocheuse escarpée. Si le joueur explique que son personnage a préalablement étudié l'itinéraire, le MJ peut accorder un avantage au jet d'escalade. En revanche, s'il tente de gravir la paroi sous une pluie battante, le MJ pourrait imposer un désavantage.</em></p>
                <p>Note : Les avantages et désavantages ajoutent une dimension narrative aux jets de dés, introduisant plus de suspense et de variété dans le déroulement du jeu. Ils encouragent également les joueurs à considérer activement les circonstances de leur personnage et à explorer des approches créatives face aux défis.</p>
            </div>
            <div className='races'>
                <h2>Les races jouables</h2>
                <p>Choisissez parmi une variété de races jouables, chacune avec ses propres caractéristiques distinctives. De nobles Elfes aux robustes Nains, en passant par les mystérieux Hommes-Lézards, votre aventure commence avec le choix de votre race.</p>
            </div>
            <div className='cards-races'>
            {races.map((races) => (
            <Link to={`/races/${races.RA_ID}`} key={races.RA_ID} className="race-container">
              <img
                src={"../Assets/" + races.RA_Img}
                alt={`image race ${races.RA_Nom}`}
                className="img-races"
              />
            <span className="nom-races">{races.RA_Nom}</span>
            </Link>
            ))}
            </div>
            {/* <div className='classes'>
                <h2>Les Classes jouables</h2>
                <p>Maîtrisez des compétences exceptionnelles en sélectionnant l'une des classes jouables. Que vous soyez un puissant Mage invoquant la magie, un agile Assassin se faufilant dans l'ombre, ou un Chevalier intrépide défendant l'honneur, les possibilités sont infinies.</p>
            </div> */}
            <Link to={"/taverne"} className='btn_taverne'>Taverne</Link>
        </div>
     );
}
 
export default Regles;