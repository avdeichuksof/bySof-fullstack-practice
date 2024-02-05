import './subMenu.css'
import React from 'react'
import { NavLink } from "react-router-dom"

const Submenu = () => {
    return (
        <nav>
            <ul className='submenu'>
                <li><NavLink to="/api/products" className='menu-item'>Todo</NavLink></li>
                <li><NavLink to="/api/products/arcilla" className='menu-item'>Arcilla</NavLink></li>
                <li><NavLink to="/api/products/cajitas" className='menu-item'>Cajitas</NavLink></li>
                <li><NavLink to="/api/products/cuadros" className='menu-item'>Cuadros</NavLink></li>
                <li><NavLink to="/api/products/personalizados" className='menu-item'>Personalizados</NavLink></li>
            </ul>
        </nav>
    )
}

export default Submenu;
