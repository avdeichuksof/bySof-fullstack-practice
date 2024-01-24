import './session.css'
import React, { useState } from 'react'
import background from '../../img/sessionBackground.png'
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

        <div className='container'>
            <div className="container-right">
                <h3>INICIA SESIÓN</h3>
                <div className="form-box">
                    <form onSubmit={submitHandler}>
                        <div className="form-item">
                            <label htmlFor="email">EMAIL</label>
                            <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="password">CONTRASEÑA</label>
                            <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required />
                        </div>

                        <div className="button">
                            <button type='submit'>Iniciar sesión</button>
                        </div>
                    </form>
                </div>
                <div className="small-content">
                    <div className="register">
                        <p>¿Aún no tienes una cuenta?</p>
                        <a href={`${baseURL}/register`}>Registrate</a>
                    </div>
                    <div className="forgot-pass">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
            <div className='container-left'>
                <img src={background} alt="darth vader | anakin" />
            </div>
        </div>
    )
}

export default Login