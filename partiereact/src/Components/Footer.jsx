import React from 'react';
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <footer>
            <p className='p_footer'>© 2024, Roleverse</p>
            <Link to={"/mentionlegale"} className='link_footer'>Mentions légales</Link>
            <Link to={"/contact"} className='link_footer'>Contact</Link>
        </footer>
     );
}
 
export default Footer;