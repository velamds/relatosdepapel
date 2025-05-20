import { NavLink } from "react-router-dom"

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        isActive ? 'navbar__item--active' : 'navbar__item'
    return (
        <nav className="navbar"> 
            <NavLink className={linkClass} to='/home'>
                Inicio
            </NavLink>
            <NavLink className={linkClass} to='/categorias'>
                Categorias
            </NavLink>
            <NavLink className={linkClass} to='/about'>
                Acerca De
            </NavLink>
            <NavLink className={linkClass} to='/contact'>
                Contacto
            </NavLink>


        </nav>
    )
}

export default Navbar