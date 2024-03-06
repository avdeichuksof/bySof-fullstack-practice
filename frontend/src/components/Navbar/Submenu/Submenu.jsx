import './subMenu.css'
import React from 'react'
import { NavLink } from "react-router-dom"

const Submenu = () => {
    return (
        <nav>
            <ul className='submenu'>
                <li><NavLink to="/products" className='menu-item'>Todo</NavLink></li>
                <li><NavLink to="/products?category=arcilla" className='menu-item'>Arcilla</NavLink></li>
                <li><NavLink to="/products?category=cajitas" className='menu-item'>Cajitas</NavLink></li>
                <li><NavLink to="/products?category=cuadros" className='menu-item'>Cuadros</NavLink></li>
                <li><NavLink to="/products?category=personalizados" className='menu-item'>Personalizados</NavLink></li>
            </ul>
        </nav>
    )
}

export default Submenu;
