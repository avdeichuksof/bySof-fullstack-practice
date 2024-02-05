import './session.css'
import logo from '../../img/logo.png'
import background from '../../img/bg2.png'
import React, { useState } from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const formBase = {
    email: ''
}

const baseURL = 'http://localhost:8080'


const ForgotPassword = () => {
    const [form, setForm] = useState(formBase)

    const submitHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axiosClient.postRequest({
                url: `${baseURL}/api/auth/sendrecoverymail`,
                body: form,
                configs: config,
                callbackSuccess: (res) => {
                    console.log('Email sent', res)
                    alert('Revisa tu correo para realizar el cambio de contraseña')
                },
                callbackError: (error) => {
                    console.error('Error sending mail: ', error)
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
            throw new Error('Error al enviar mail')
        }    
    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }
    
    return (
        <div className="body" style={{ backgroundImage: `url(${background})` }} >
            <nav className="nav">
                <img src={`${logo}`} alt="brand" />
            </nav>

            <div className="container">
                <h1>¿Olvidaste tu contraseña?</h1>
                <p>Ingresa el correo electrónico asociado a tu cuenta para restablecerla.</p>
                <div className="form-box">
                    <form onSubmit={submitHandler}>
                        <div className="form-item">
                            <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                            <label htmlFor="email">EMAIL</label>
                        </div>
                        <div className="button">
                            <button type='submit'>ENVIAR</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword