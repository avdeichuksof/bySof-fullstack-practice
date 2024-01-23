import './profileMenu.css'
import { NavLink } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()


const ProfileMenu = () => {

    const baseURL = 'http://localhost:8080'

    const [isLoggedIn, setLogin] = useState(false)

    const loginHandler = async () => {
        setLogin(!isLoggedIn)
    }

    const sessionRoutesHandler = async (route) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try {
            axiosClient.getRequest({
                url: `${baseURL}${route}`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('Successfull request ', res)
                },
                calbackError: (error) => {
                    console.error('Error: ', error)
                }
            })
        } catch (error) {
            throw new Error('Error sending request:', error)
        }
    }

    return (
        <nav>
            <ul>
                {!isLoggedIn ? (
                    <li><NavLink to="/login" className='menu-item' onClick={() => sessionRoutesHandler('/auth/login')}>Iniciar Sesión</NavLink></li>
                ) : (
                    <>
                        <li><NavLink to="/currentuser" className='menu-item' onClick={() => sessionRoutesHandler('/auth/currentuser')}>Mi Perfil</NavLink></li>
                        {/* <li>Última conexión: </li> */}
                        <li><NavLink to="/logout" className='menu-item' onClick={loginHandler}>Cerrar Sesión</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default ProfileMenu