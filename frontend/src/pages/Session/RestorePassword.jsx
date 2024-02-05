import './session.css'
import logo from '../../img/logo.png'
import background from '../../img/bg4.png'
import React, { useState} from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const formBase = {
    password: ''
}

const baseURL = 'http://localhost:8080'

const RestorePassword = () => {
    const [form, setForm] = useState(formBase)

    const submitHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // obtenemos las query params para buscar el email
        const url = new URL(window.location.href)
        const userEmail = url.searchParams.get('email')


        try {
            const res = await axiosClient.postRequest({
                url: `${baseURL}/api/auth/restorepassword`,
                body: {email: userEmail, password: form.password},
                configs: config,
                callbackSuccess: (res) => {
                    console.log('Response from server:', res)
                    console.log('Password restored')
                    if (res && res.status === 200) window.location.href = `${baseURL}/login`
                },
                callbackError: (error) => {
                    console.error('Error restoring password: ', error)
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
            throw new Error('Error al restablecer contraseña')
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
                <h1>REESTABLECER CONTRASEÑA</h1>
                <p>Ingresa tu nueva contraseña.</p>
                <div className="form-box">
                    <form onSubmit={submitHandler}>
                        {/* <div className="form-item">
                            <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                            <label htmlFor="email">EMAIL</label>
                        </div> */}
                        <div className="form-item">
                            <input type="password" name='password' value={form.password} onChange={inputChangeHandler} required />
                            <label htmlFor="password">CONTRASEÑA</label>
                        </div>
                        <div className="button">
                            <button type='submit'>CAMBIAR CONTRASEÑA</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default RestorePassword