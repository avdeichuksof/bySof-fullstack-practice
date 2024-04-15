import './session.css'
import logo from '../../img/logo.png'
import background from '../../img/bg5.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../components/Buttons/Button'

const Login = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const formBase = {
        email: '',
        password: ''
    }

    const [form, setForm] = useState(formBase)
    const [login, setLogin] = useState(null)
    const [lastConnection, setLastConnection] = useState('')

    const checkCurrentUser = () => {
        // fijarse si existe un currentUser
        axiosClient.getRequest({
            url: `${baseURL}/api/auth/currentuser`,
            callbackSuccess: (res) => {
                if(res.data.currentUser) {
                    setLogin(true)
                    setLastConnection(res.data.currentUser.lastConnection)
                } else {
                    // no se encontró usuario
                    setLogin(false)
                    setLastConnection('')
                }
            },
            callbackError: (error) => {
                console.error('Error checking current user: ', error);
            }
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault() 
        
        try {
            await axiosClient.postRequest({
                url: `${baseURL}/api/auth/login`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User logged in ', res)
                    checkCurrentUser()
                    if (res && res.status === 200) window.location.href = `${baseURL}`
                },
                callbackError: (error) => {
                    console.error('Error logging in: ', error)
                    alert(error.response.data.error || 'Error al iniciar sesión, verifica tus credenciales.')
                }
            })
        } catch (error) {
            console.error('Error sending request:', error)
            throw new Error('Error al iniciar sesión, verifica tus credenciales.')
        }

    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    return (
        <div className="body" style={{ backgroundImage: `url(${background})` }}>
            <nav className="nav">
                <Link to='/'>
                    <img src={`${logo}`} alt="brand" />
                </Link>
            </nav>
            <div className='container'>
                <h1>INICIA SESIÓN</h1>
                <div className="form-box">
                    <form onSubmit={submitHandler}>
                        <div className="form-item">
                            <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                            <label htmlFor="email">email</label>
                        </div>

                        <div className="form-item">
                            <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required />
                            <label htmlFor="password">contraseña</label>
                        </div>

                        <div className="button">
                            <Button className='btn-session' type='submit' content="Iniciar Sesión" />
                        </div>
                    </form>
                </div>
                <div className="forgot-pass">
                    <a href={`${baseURL}/sendrecoverymail`}>¿Olvidaste tu contraseña?</a>
                </div>
                <div className="registerRedirect">
                    <p>¿Aún no tienes una cuenta?</p>
                    <a href={`${baseURL}/register`}>Registrate</a>
                </div>
            </div>
        </div>
    )
}

export default Login