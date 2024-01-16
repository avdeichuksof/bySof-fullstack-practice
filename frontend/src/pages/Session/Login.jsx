import './session.css'
import { useState } from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const formBase = {
    email: '',
    password: ''
}

const baseURL = process.env.REACT_APP_BASE_URL
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
            axiosClient.postRequest({
                url: `${baseURL}/api/auth/login`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    console.log('User logged ing ', res)
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
        const {name, value} = e.target
        setForm({...form, [name]:value})
    }

    return (
        
        <div className='container'>
            <h3>INICIA SESIÓN</h3>
            <div className="loginForm">
                <form onSubmit={submitHandler}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required/>

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required/>

                    <button type='submit'>Iniciar sesión</button>
                </form>
            </div>

            <div>
                <p>¿Aún no tienes una cuenta?</p>
                <a href={`${baseURL}/api/auth/register`}>Registrate</a>
            </div>
        </div>
    )
}

export default Login