import React from 'react';
import "./Footer.css";
import copyright from "../assets/copyrightcopyright.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <div className="footer">
            <img src={copyright} alt="copyright" className='copyright'/>
            <p className='p_footer'>2024, Roleverse</p>
            <p className='p_footer'>Mentions légales</p>
            <Link to={"/contact"} className='btn_nav'>Contact</Link>
        </div>
     );
}
 
export default Footer;