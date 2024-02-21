import './profileView.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const ProfileView = () => {
    const baseURL = 'http://localhost:8080'

    // guardamos el currentUser
    const [user, setUser] = useState(null)
    useEffect(() => {
        axiosClient.getRequest({
            url: `${baseURL}/api/auth/currentuser`,
            callbackSuccess: (res) => {
                console.log('User Data: ', res.data.currentUser)
                setUser(res.data.currentUser)
            },
            callbackError: (error) => {
                console.error('Error checking current user: ', error)
            }
        })
    }, [])

    const userId = user ? user.id : null

    // tomamos datos del usuario encontrado
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (user) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

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
        <div className="profileView">
            <h1>Bienvenid@ {userData?.firstName || 'Usuario'}</h1>
            <div className="content">
                <div className="user-data">
                    <p>role: {userData?.role}</p>
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
                                <Link to='' className='options-item'><li>Hacerse VIP</li></Link>
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