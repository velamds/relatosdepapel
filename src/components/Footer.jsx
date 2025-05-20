import React from 'react'
import logo from '../assets/relatos-de-papel-logo.png'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__logo">
                <img className="logo__img"  src={logo} alt="Logo" />
            </div>

            <div className="footer__copyright">Todos los derechos reservados - Ramen X - Unir 2025</div>

            <div className="footer__social_network_links">
                <a href="https://www.facebook.com/relatosdepapelramenx/" target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/relatosdepapelramenx/" target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" />
                </a>
                <a href="https://twitter.com/relatosdepapelramenx" target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/twitter.png" alt="Twitter" />
                </a>
            </div>
        </div>
    )
}

export default Footer