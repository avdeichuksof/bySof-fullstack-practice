import './session.css'
import React, { useState } from 'react'
import background from '../../img/sessionBackground.png'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const formBase = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: ''
}

const baseURL = 'http://localhost:8080'
const Register = () => {

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
                url: `${baseURL}/api/auth/register`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User registered ', res)
                    if (res && res.status === 200) window.location.href = '/login'
                },
                callbackError: (error) => {
                    console.error('Error registering user: ', error)
                }
            })



        } catch (error) {
            console.error('Error sending request:', error)
        }
    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }


    return (
        <div className='container'>
            <div className="container-right">
                <div className="form-box">
                    <h3>REGISTRATE</h3>
                    <div className="registerForm">
                        <form onSubmit={submitHandler}>

                            <div className="form-item">
                                <label htmlFor="firstName">Nombre</label>
                                <input type="text" name='firstName' value={form.firstName} onChange={inputChangeHandler} required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="lastName">Apellido</label>
                                <input type="text" name='lastName' value={form.lastName} onChange={inputChangeHandler} required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="age">Edad</label>
                                <input type="number" name='age' value={form.age} onChange={inputChangeHandler} required />
                            </div>

                            <div className="button">
                                <button type='submit'>Registrarse</button>
                            </div>
                        </form>
                    </div>
                </div>

                    <div className="login">
                        <p>¿Ya tienes una cuenta?</p>
                        <a href={`${baseURL}/login`}>Inicia sesión</a>
                    </div>
            </div>
            <div className='container-left'>
                <img src={background} alt="darth vader | anakin" />
            </div>
        </div>
    )
}

export default Register