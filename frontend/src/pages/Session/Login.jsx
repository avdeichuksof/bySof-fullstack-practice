import './session.css'
import logo from '../../img/logo.png'
import background from '../../img/bg5.png'
import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()


const formBase = {
    email: '',
    password: ''
}

const baseURL = 'http://localhost:8080'
const Login = () => {

    const [form, setForm] = useState(formBase)

    const submitHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const res = await axiosClient.postRequest({
                url: `${baseURL}/api/auth/login`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User logged in ', res)
                    if (res && res.status === 200) window.location.href = `${baseURL}`
                },
                callbackError: (error) => {
                    console.error('Error logging in: ', error)
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
                                <label htmlFor="email">EMAIL</label>
                            </div>

                            <div className="form-item">
                                <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required />
                                <label htmlFor="password">CONTRASEÑA</label>
                            </div>

                            <div className="button">
                                <button type='submit'>INICIAR SESIÓN</button>
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