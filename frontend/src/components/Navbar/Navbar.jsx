import './navBar.css'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import brand from '../../img/logo.png'
import Submenu from './Submenu/Submenu'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const Navbar = () => {
    const [click, setClick] = useState(false)
    const clickHandler = () => {
        setClick(!click)
    }

    // agregamos efecto para manejar los cambios del tamaño de ventana.
    // Arreglamos problema de que no se vea el menú al cambiar tamaño
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && click) {
                setClick(false)
            }
        }

        // escucha el cambio de tamaño de ventana
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [click])


    const [subMenu, setSubMenu] = useState(false)
    const subMenuHandler = () => {
        setSubMenu(!subMenu)
    }

    const [profileMenu, setProfileMenu] = useState(false)
    const profileMenuHandler = () => {
        setProfileMenu(!profileMenu)
    }

    const baseURL = 'http://localhost:8080'

    // tomamos los datos del usuario
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        axiosClient.getRequest({
            url: `${baseURL}/api/auth/currentuser`,
            callbackSuccess: (res) => {
                console.log('User Data: ', res.data.currentUser)
                setUserData(res.data.currentUser)
            },
            callbackError: (error) => {
                console.error('Error checking current user: ', error)
            }
        })
    }, [])

    const userCart = userData ? userData.cart : null

    return (
        <header className='header'>
            <Link to='/'>
                <img src={brand} alt="brand" className='brand' />
            </Link>

            <nav>

                <ul className={`menu-${click ? 'mobile' : 'inline'}`}>
                    <li><NavLink to={`${baseURL}`} className='menu-item'>Inicio</NavLink></li>
                    <li className={`menu-item text-${subMenu ? 'color' : ' '}`} onClick={subMenuHandler}>Productos
                        <ul className={`submenu-${subMenu ? 'open' : 'closed'}`}>
                            <Submenu />
                        </ul>
                    </li>
                    <li><NavLink to='/contact' className='menu-item'>Contacto</NavLink> </li>
                    <li><NavLink to='/about' className='menu-item'>Nosotros</NavLink></li>
                    <li><NavLink to='/faqs' className='menu-item'>FAQs</NavLink></li>

                    <li>
                        <NavLink to={`/carts/${userCart}`} className='icon menu-item'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </NavLink>
                    </li>

                    <li className={`menu-item text-${profileMenu ? 'color' : ' '}`} onClick={profileMenuHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                        <ul className={`profileMenu-${profileMenu ? 'open' : 'closed'}`}>
                            <ProfileMenu />
                        </ul>
                    </li>
                </ul>
            </nav>

            <div className="icon-burger">
                <BurgerMenu click={click} clickHandler={clickHandler} />
            </div>

        </header>
    )
}

export default Navbar;