import './session.css'
import logo from '../../img/logo.png'
import background from '../../img/bg7.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
        <div className="body" style={{ backgroundImage: `url(${background})` }}>
            <nav className="nav">
                <Link to='/'>
                    <img src={`${logo}`} alt="brand" />
                </Link>
            </nav>
            <div className='container'>
                    <h1>REGISTRATE</h1>
                    <div className="form-box">
                        <form onSubmit={submitHandler}>
                            <div className="box">
                                <div className="form-item">
                                    <input type="text" name='firstName' value={form.firstName} onChange={inputChangeHandler} required />
                                    <label htmlFor="firstName">NOMBRE</label>
                                </div>

                                <div className="form-item">
                                    <input type="text" name='lastName' value={form.lastName} onChange={inputChangeHandler} required />
                                    <label htmlFor="lastName">APELLIDO</label>
                                </div>
                            </div>

                            <div className="form-item">
                                <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                                <label htmlFor="email">EMAIL</label>
                            </div>

                            <div className="box2">
                                <div className="form-item">
                                    <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required />
                                    <label htmlFor="password">CONTRASEÑA</label>
                                </div>

                                <div className="form-item">
                                    <input type="number" name='age' value={form.age} onChange={inputChangeHandler} required />
                                    <label htmlFor="age">EDAD</label>
                                </div>
                            </div>

                            <div className="button">
                                <button type='submit'>REGISTRARSE</button>
                            </div>
                        </form>
                    </div>

                <div className="loginRedirect">
                    <p>¿Ya tienes una cuenta?</p>
                    <a href={`${baseURL}/login`}>Inicia sesión</a>
                </div>
            </div>
        </div>
    )
}

export default Register