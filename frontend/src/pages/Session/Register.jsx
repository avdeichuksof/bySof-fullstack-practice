import './session.css'
import logo from '../../img/logo.png'
import background from '../../img/bg7.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../components/Buttons/Button'

const formBase = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: ''
}

const Register = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const [form, setForm] = useState(formBase)

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            await axiosClient.postRequest({
                url: `${baseURL}/api/auth/register`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    toast.success('Usuario registrado.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                    if (res && res.status === 200) window.location.href = '/login'
                },
                callbackError: (error) => {
                    console.error('Error registering user: ', error)
                    toast.error('Error al registrar usuario. Intentalo nuevamente.', {
                        duration: 5000,
                        position: 'top-right'
                    })
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
            <Toaster />
            <div className='container'>
                    <h1>REGISTRATE</h1>
                    <div className="form-box">
                        <form onSubmit={submitHandler}>
                            <div className="box">
                                <div className="form-item">
                                    <input type="text" name='firstName' value={form.firstName} onChange={inputChangeHandler} required />
                                    <label htmlFor="firstName">nombre</label>
                                </div>

                                <div className="form-item">
                                    <input type="text" name='lastName' value={form.lastName} onChange={inputChangeHandler} required />
                                    <label htmlFor="lastName">apellido</label>
                                </div>
                            </div>

                            <div className="form-item">
                                <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                                <label htmlFor="email">email</label>
                            </div>

                            <div className="box2">
                                <div className="form-item">
                                    <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required />
                                    <label htmlFor="password">contraseña</label>
                                </div>

                                <div className="form-item">
                                    <input type="number" name='age' value={form.age} onChange={inputChangeHandler} required />
                                    <label htmlFor="age">edad</label>
                                </div>
                            </div>

                            <div className="button">
                                <Button className='btn-session' type='submit' content="Registrarse" />
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