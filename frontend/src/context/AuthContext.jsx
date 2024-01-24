import React, {createContext, useContext, useState} from "react"
import AxiosClient from "../services/axiosClient"
const axiosClient = new AxiosClient()

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setLogin] = useState(false)
    const [user, setUser] = useState(null)

    const login = async (email, password) => {
        const url = 'http://localhost:8080/api/auth/login'

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        
        const body = {
            email: email,
            password: password
        }

        axiosClient.postRequest({
            url: url,
            body: body,
            config: config,
            callbackSuccess: (data) => {
                console.log('Data Login : ', data)
                const userFromServer = data.user
                
                setLogin(true)
                setUser(userFromServer)
            },
            callbackError: (error) => {
                console.error('Login error: ', error)
            }
        })
    }

    const logout = () => {
        setLogin(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}