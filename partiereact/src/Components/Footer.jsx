import React from 'react';
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <footer>
            <p className='p_footer'>© 2024, Roleverse</p>
            <p className='p_footer'>Mentions légales</p>
            <Link to={"/contact"} className='btn_nav'>Contact</Link>
        </footer>
     );
}
 
export default Footer;