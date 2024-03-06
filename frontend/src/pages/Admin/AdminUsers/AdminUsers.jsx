import '../administration.css'
import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../../components/Buttons/Button'
import UserCard from '../../../components/Users/UserCard/UserCard'

const AdminUsers = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const getUserById = {
        id: ''
    }

    // -------------------------------- get user by ID
    const [user, setUser] = useState(getUserById)
    const [userId, setUserId] = useState('')
    const [showUserOptions, setShowUserOptions] = useState(null)

    const getUserByIdHandler = async (e) => {
        e.preventDefault()

        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            console.error('Invalid ID format');
            setUser('')
        }

        try {
            const response = await axiosClient.getRequest({
                url: `${baseURL}/api/users/${userId}`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User Found: ', res.data.user)
                    setUser(res.data.user)
                    setShowUserOptions(true)
                },
                callbackError: (error) => {
                    console.error('Invalid ID, User not found: ', error)
                    setShowUserOptions(false)
                    setUser({})
                    setUserId('')
                }
            })

            // Actualiza userId solo si se encuentra un usuario
            if (response && response.data && response.data.user) setUserId(response.data.user.id)

        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const userIdChangeHandler = (e) => {
        const { value } = e.target
        setUser({ ...user, id: value })
        setUserId(value)
    }

    // -------------------------------- get user purchases
    const [purchases, setPurchases] = useState([])
    const [showPurchases, setShowPurchases] = useState(null)
    const getUserPurchasesHandler = async () => {
        try {
            if (!userId) {
                console.log('User ID is invalid')
                return
            }

            await axiosClient.getRequest({
                url: `${baseURL}/api/users/${userId}/purchases`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User purchases: ', res.data)
                    setPurchases(res.data)
                    setShowPurchases(true)
                },
                callbackError: (error) => {
                    console.log('Error getting purchases: ', error)
                    setShowPurchases(false)
                }
            })

        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    // --------------------------------------  delete user
    const deleteUserHandler = async () => {
        try {
            if (!userId) {
                console.log('User ID is invalid')
                return
            }

            await axiosClient.deleteRequest({
                url: `${baseURL}/api/users/${userId}`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User deleted: ', res.data)
                },
                callbackError: (error) => {
                    if (error.response && error.response.status === 404) {
                        console.log('User not found')
                    }
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    // ----------------------------------  delete inactive users
    const [inactiveUsers, setInactiveUsers] = useState([])
    const [inactiveUsersError, setInactiveUsersError] = useState(false)
    const deleteInactiveUsersHandler = async () => {
        try {
            await axiosClient.deleteRequest({
                url: `${baseURL}/api/users/inactive`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('Users deleted: ', res.data)
                    setInactiveUsersError(false)
                    setInactiveUsers(res.data)
                },
                callbackError: (error) => {
                    console.log('Error deleting users or not users were inactive: ', error)
                    setInactiveUsersError(true)
                    setInactiveUsers([])
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }



    return <div className='admin-container'>
        {/* agregar link de volver a mi perfil */}
        <h1 className='admin-title'>Administración de Usuarios</h1>

        <div className="get-id">
            <h2>Buscar usuario por ID</h2>
            <form onSubmit={getUserByIdHandler}>
                <div className="product-form-item">
                    <input type="text" name='id' value={userId || ''} onChange={userIdChangeHandler} required />
                    <label htmlFor="id">ID</label>
                </div>
                <div className="btns-container">
                    <Button className='btn-session' type='submit' content='BUSCAR USUARIO' />
                </div>
            </form>
        </div>
        <div className="btns-container">
            <Button className='btn-session' onClick={deleteInactiveUsersHandler} content='ELIMINAR USUARIOS INACTIVOS' />
        </div>

        {inactiveUsersError && inactiveUsers.length === 0 && (
            <p className='error-txt'>No se han encontrado usuarios inactivos.</p>
        )}

        {showUserOptions && user && (
            <>
                <h2 className='prod-found'>Usuario encontrado:</h2>
                <UserCard user={user} />

                <div className="btns-container">
                    <Button className='btn-session' onClick={getUserPurchasesHandler} content='COMPRAS DEL USUARIO' />
                    <Button className='btn-session' onClick={deleteUserHandler} content='ELIMINAR USUARIO' />
                </div>

                {showPurchases === false && purchases.length === 0 && (
                    <p className='error-txt'>No se han efectuado compras por parte del usuario</p>
                )}
            </>
        )}

        {!user && (
            <p className='error-txt'>No se ha encontrado ningún usuario con ese ID. Por favor, inténtelo nuevamente.</p>
        )}

    </div>
}

export default AdminUsers