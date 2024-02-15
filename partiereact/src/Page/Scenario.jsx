import { React, useContext, useEffect, useState } from 'react';
import "../Styles/Scenario.css";
import taverneService from "../Services/taverneService";
import { Link, useParams } from 'react-router-dom';

const Scenario = () => {
    const { id } = useParams();
    const [scenarios, setScenarios] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await taverneService.fetchScenarioById(id);
          setScenarios(response.data[0]);
        } catch (error) {
          console.error("Erreur lors de la récupération des scénarios :", error);
        }
      };
  
      fetchData();
    }, []);
console.log(scenarios);
    return ( <div className='scenario'>
        <div className='div_titre'>
            <p className='titre_scenar'>{scenarios.SC_Nom}</p>
        </div>
        <div className='scenar_container'>
                <img src={"../Assets/" + scenarios.SC_Img} alt={`image scénario ${scenarios.SC_Nom}`} />
                <p>{scenarios.SC_Description}</p>
        </div>
        <div className='btn_scenar'>
            <Link to={"/regle"} id='btn_game'>Règle du jeu</Link>
            <Link to={"/taverne"} className='btn_retour'>Retour</Link>
        </div>
    </div> );
}
 
export default Scenario;