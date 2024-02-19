import { React, useEffect, useState } from 'react';
import "../Styles/Races.css";
import racesService from "../Services/racesService";
import { Link, useParams } from 'react-router-dom';

const Races = () => {
    const { id } = useParams();
    const [races, setRaces] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await racesService.fetchRacesById(id);
          setRaces(response.data[0]);
        } catch (error) {
          console.error("Erreur lors de la récupération de la race :", error);
        }
      };
  
      fetchData();
    }, []);
console.log(races);
    return ( <div className='scenario'>
        <div className='div_titre'>
            <p className='titre_scenar'>{races.RA_Nom}</p>
        </div>
        <div className='scenar_container'>
                <img src={"../Assets/" + races.RA_Img} alt={`image race ${races.RA_Nom}`} />
                <p>{races.RA_Description}</p>
                <h3>Bonus de Race</h3>
                <p>{races.RA_Bonus}</p>
        </div>
        <div className='btn_scenar'>
            <Link to={"/regle"} className='btn_retour'>Retour</Link>
        </div>
    </div> );
}
 
export default Races;