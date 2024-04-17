import './contact.css'
import React, { useState } from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import contactIllustration from '../../img/undraw_team_chat_re_vbq1.svg'
import Button from '../../components/Buttons/Button'

const formBase = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
    file: ''
}

const Contact = () => {
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
            // Crear un objeto FormData para enviar el formulario y el archivo adjunto
            const formData = new FormData();
            formData.append('fullName', form.fullName);
            formData.append('email', form.email);
            formData.append('subject', form.subject);
            formData.append('message', form.message);
            formData.append('file', form.file); // Adjunta la ruta del archivo seleccionado


            await axiosClient.postRequest({
                url: `${baseURL}/contact`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    console.log('Email data: ', form)
                    if (res && res.status === 200) console.log('Email sent')
                },
                callbackError: (error) => console.error('Error sending email: ', error)
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const fileChangeHandler = (e) => {
        // Almacena solo la ruta del archivo seleccionado
        const file = e.target.files[0]
        setForm({ ...form, file: file ? file.name : '' }); // Guarda el nombre del archivo en lugar del objeto de archivo
    }

    const resetForm = () => {
        setForm(formBase)
    }

    return (
        <div className="contact">
            <h1 className="title">Contactanos</h1>
            <div className="contact-box">
                <img className='contact-illustration' src={contactIllustration} alt="ilustración" />
                <div className="form-container">
                    <form onSubmit={submitHandler}>
                        <div className="contact-form-box">
                            <div className="contact-form-item">
                                <input type="text" name='fullName' value={form.fullName} onChange={inputChangeHandler} required />
                                <label htmlFor="fullName">nombre y apellido</label>
                            </div>
                            <div className="contact-form-item">
                                <input type="email" name='email' value={form.email} onChange={inputChangeHandler} required />
                                <label htmlFor="email">email</label>
                            </div>
                        </div>
                        <div className="contact-form-box-message">
                            <div className="contact-form-item">
                                <input type="text" name='subject' value={form.subject} onChange={inputChangeHandler} required />
                                <label htmlFor="subject">asunto</label>
                            </div>
                            <div className="contact-form-item">
                                <textarea name="message" value={form.message} onChange={inputChangeHandler} required></textarea>
                                <label htmlFor="message">mensaje</label>
                            </div>
                        </div>
                        <div className='file-select'>
                            <input type="file" name='file' onChange={fileChangeHandler} />
                        </div>

                        <div className="buttons">
                            <Button className='btn-session' type='button' onClick={resetForm} content='BORRAR TODO' />
                            <Button className='btn-session' type='submit' content='ENVIAR' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}

export default Contact