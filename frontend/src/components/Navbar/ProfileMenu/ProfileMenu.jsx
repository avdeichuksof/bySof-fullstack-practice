import './profileMenu.css'
import { NavLink } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()


const ProfileMenu = () => {
    const baseURL = 'http://localhost:8080'

    const [isLoggedIn, setLogin] = useState(false)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        // fijarse si existe un currentUser
        axiosClient.getRequest({
            url: `${baseURL}/api/auth/currentuser`,
            callbackSuccess: (res) => {
                setLogin(!!res.data.currentUser)
                setUserData(res.data.currentUser)
            },
            callbackError: (error) => {
                console.error('Error checking current user: ', error)
            }
        })
    }, [])

    const userId = userData ? userData.id : null

    const logoutHandler = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            setLogin(false)
            const res = await axiosClient.getRequest({
                url: `${baseURL}/api/auth/logout`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User logged out ', res)
                    window.location.href = `${baseURL}/login`
                },
                callbackError: (error) => {
                    console.error('Error logging out: ', error)
                    throw new Error(error)
                }
            })
        } catch (error) {
            console.log('Error sending request: ', error)
        }
    }

    return (
        <nav>
            <ul className='profileMenu'>
                {!isLoggedIn ? (
                    <li><NavLink to="/login" className='menu-item' >Iniciar Sesión</NavLink></li>
                ) : (
                    <>
                        <li><NavLink to={`/users/${userId}`} className='menu-item' >Mi Perfil</NavLink></li>
                    
                        <li onClick={logoutHandler} className='menu-item'>Cerrar Sesión</li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default ProfileMenu