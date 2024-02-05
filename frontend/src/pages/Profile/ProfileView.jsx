import './profileView.css'
import React, {useState, useEffect} from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const ProfileView = () => {
    const baseURL = 'http://localhost:8080'

    // guardamos el currentUser
    const [user, setUser] = useState(null)
    useEffect( () => {
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
    useEffect( () => {
        if(user) {
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



    return (
        <div className="profileView">
            <h1>Bienvenid@ {userData?.firstName || 'Usuario'}</h1>
            <div className="datosUsuario">
            <p>email: {userData?.email}</p>
            <p>cart: {userData?.cart}</p>
            <p>role: {userData?.role}</p>
            <p>age: {userData?.age}</p>
            </div>
        </div>
    )

}

export default ProfileView