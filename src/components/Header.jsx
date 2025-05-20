import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
        <Link className="header__icon" to='/home'></Link>
        <div className="header__buscador">
            <input type="search" id="default-search"
                   className="buscador__input"
                   placeholder="Buscar por Título, Autor, ISBN " required/>
            <div className="buscador__icon">
                <svg className="icon__svg" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
        </div>
        <Link className="header__carticon" to='/cart'>
            <span className="carticon__tooltiptext">Carrito de Compras</span>
        </Link>
        <Link className="header__favoriteicon" to='/favorites'>
            <span className="favoriteicon__tooltiptext">Favoritos</span>
        </Link>
        <Link className="header__usericon" to='/user'>
            <span className="usericon__tooltiptext">Usuario</span>
        </Link>
        <div className="header__languageicon">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#9B59B6" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.51 22 22 17.52 22 12C22 6.48 17.51 2 12 2ZM4.26 14H6.3C6.49 15.52 6.93 16.92 7.57 18.13C5.87 16.92 4.72 15.1 4.26 14ZM4.26 10C4.72 8.9 5.87 7.08 7.57 5.87C6.93 7.08 6.49 8.48 6.3 10H4.26ZM10 4.26V6.3C8.48 6.49 7.08 6.93 5.87 7.57C7.08 5.87 8.9 4.72 10 4.26ZM14 4.26C15.1 4.72 16.92 5.87 18.13 7.57C16.92 6.93 15.52 6.49 14 6.3V4.26ZM14 19.74V17.7C15.52 17.51 16.92 17.07 18.13 16.43C16.92 18.13 15.1 19.28 14 19.74ZM10 19.74C8.9 19.28 7.08 18.13 5.87 16.43C7.08 17.07 8.48 17.51 10 17.7V19.74ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM17.7 14H19.74C19.28 15.1 18.13 16.92 16.43 18.13C17.07 16.92 17.51 15.52 17.7 14ZM16.43 5.87C18.13 7.08 19.28 8.9 19.74 10H17.7C17.51 8.48 17.07 7.08 16.43 5.87Z"/>
            </svg>
            <span className="languageicon__tooltiptext">Cambiar Idioma</span>
        </div>
    </div>
  )
}

export default Header