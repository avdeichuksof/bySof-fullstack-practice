import './profileView.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import { getCurrentUser } from '../../utils/getCurrentUser'

const ProfileView = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // tomamos currentUser
    const user = getCurrentUser()
    const userId = user ? user.id : null

    // tomamos datos del usuario encontrado
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (user) {
            axiosClient.getRequest({
                url: `${baseURL}/api/users/${userId}`,
                config: config,
                callbackSuccess: (res) => {
                    setUserData(res.data.user)
                },
                callbackError: (error) => {
                    if (error.response && error.response.status === 404) {
                        console.log('user not found')
                        setUserData(null)
                    } else {
                        console.error('Error rendering user: ', error);
                    }
                }
            })
        }
    }, [user])

    const isAdmin = userData?.role === 'admin'

    return (
        <div className="profile-view">
            <h1 className='profile-title'>Bienvenid@ {userData?.firstName || 'Usuario'}</h1>
            <div className="content">
                <div className="user-data">
                    <p>Última conexión: {userData?.lastConnection}</p>
                </div>
                <div className="user-options-container">
                    <ul className="user-options">
                        {isAdmin ? (
                            <>
                                <Link to='/adminproducts' className='options-item'><li>Administrar productos</li></Link>
                                <Link to='/adminusers' className='options-item'><li>Administrar usuarios</li></Link>
                            </>
                        ) : (
                            <>
                                <div className="vip-popup">¡Recibirás descuentos y productos únicos!</div>
                                <Link to='' className='options-item vip-item'><li>¡Pasate a VIP!</li></Link>
                                <Link to='' className='options-item'><li>Mis compras</li></Link>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default ProfileView