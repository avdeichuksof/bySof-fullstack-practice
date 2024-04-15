import React, {useState, useEffect} from 'react'
import AxiosClient from "../services/axiosClient"
const axiosClient = new AxiosClient()


export const getCurrentUser = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const [user, setUser] = useState(null)

    
    useEffect(() => {
        axiosClient.getRequest({
            url: `${baseURL}/api/auth/currentuser`,
            config: config,
            callbackSuccess: (res) => {
                console.log('User Data: ', res.data.currentUser)
                setUser(res.data.currentUser)
            },
            callbackError: (error) => {
                console.error('Error checking current user: ', error)
            }
        })
    }, [])

    return user
}

