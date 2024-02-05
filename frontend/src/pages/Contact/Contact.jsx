import './contact.css'
import React, {useState} from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const formBase = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
}

const Contact = () => {
    const baseURL = 'http://localhost:8080'

    const [form, setForm] = useState(formBase)

    const submitHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type':  'application/json'
            }
        }

        try {
            const res = await axiosClient.postRequest({
                url: `${baseURL}/contact`,
                body: form,
                config: config,
                callbackSuccess: (res) => {
                    if(res && res.status === 200) console.log('Email sent')
                },
                callbackError: (error) => console.error('Error sending email: ', error)
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setForm({...form, [name]: value})
    }

    return (
        <div className="contact">
            <h1 className="title">Contactanos</h1>
            <div className="formContainer">
                <form action=""></form>
            </div>
            <div className="contactInfo"></div>
        </div>
    )


}