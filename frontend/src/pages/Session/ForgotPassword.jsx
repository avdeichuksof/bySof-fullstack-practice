import './session.css'
import logo from '../../img/logo.png'
import background from '../../img/bg2.png'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../components/Buttons/Button'

const ForgotPassword = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const formBase = {
        email: ''
    }
    
    const [form, setForm] = useState(formBase)

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await axiosClient.postRequest({
                url: `${baseURL}/api/auth/sendrecoverymail`,
                body: form,
                configs: config,
                callbackSuccess: (res) => {
                    console.log('Email sent', res)
                    toast('Revisa tu correo para realizar el cambio de contraseña', {
                        duration: 5000,
                        position: 'top-right'
                    })
                },
                callbackError: (error) => {
                    console.error('Error sending mail: ', error)
                    toast.error('Ocurrió un error. Vuelve a intentarlo.', {
                        duration: 5000,
                        position: 'top-right'
                    })
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
            <Toaster />
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
                            <Button className='btn-session' type='submit' content='Enviar' />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword