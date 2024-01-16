import './session.css'
import { useState, useEffect } from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const formBase = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: ''
}

const baseURL = process.env.REACT_APP_BASE_URL
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
            axiosClient.postRequest({
                url: `${baseURL}/api/auth/register`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User registered ', res)
                },
                calbackError: (error) => {
                    console.error('Error registering user: ', error)
                }
            })
        } catch (error) {
            console.error('Error sending request:', error)
        }
    }

    const inputChangeHandler = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]:value})
    }


    return (
        <div className='container'>
            <h3>REGISTRATE</h3>
            <div className="registerForm">
                <form onSubmit={submitHandler}>
                    <label htmlFor="firstName">Nombre</label>
                    <input type="text" name='firstName' value={form.firstName} onChange={inputChangeHandler} required/>

                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" name='lastName' value={form.lastName} onChange={inputChangeHandler} required/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required/>

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required/>

                    <label htmlFor="age">Edad</label>
                    <input type="number" name='age' value={form.age} onChange={inputChangeHandler} required/>

                    <button type='submit'>Registrarse</button>
                </form>
            </div>
            <div>
                <p>¿Ya tienes una cuenta?</p>
                <a href={`${baseURL}/api/auth/login`}>Inicia sesión</a>
            </div>
        </div>
    )
}

export default Register