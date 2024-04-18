import '../EditUserForm/editUserForm.css'
import React, { useState } from "react"
import toast, { ToastBar, Toaster } from 'react-hot-toast'

import AxiosClient from "../../../services/axiosClient"
const axiosClient = new AxiosClient()

import { getCurrentUser } from "../../../utils/getCurrentUser"
import Button from "../../Buttons/Button"

const ChangePasswordForm = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const changePasswordForm = {
        password: '',
        newPassword: ''
    }

    // -------------------- current user data
    const user = getCurrentUser()
    const userId = user ? user.id : null


    // --------------- change password
    const [changePassword, setChangePassword] = useState(changePasswordForm)

    const updatePasswordHandler = (e) => {
        e.preventDefault()

        try {
            axiosClient.putRequest({
                url: `${baseURL}/api/users/edit/${userId}/password`,
                body: changePassword,
                config: config,
                callbackSuccess: (res) => {
                    toast.success('Se ha cambiado la contraseña.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                    // Mantener el objeto changePassword actualizado incluso después de cambiar la contraseña
                    setChangePassword(prevState => ({
                        ...prevState,
                        password: '',
                        newPassword: ''
                    }))
                },
                callbackError: (error) => {
                    toast.error('Error al cambiar la contraseña.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                    setChangePassword(changePasswordForm)
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const updatePassChangeHandler = (e) => {
        const { name, value } = e.target
        setChangePassword({ ...changePassword, [name]: value })
    }

    return (
        <>
            <Toaster />
            <div className="user-form-container pass-form">
                <h2 className='user-form-subtitle'>Cambiar contraseña</h2>
                <form onSubmit={updatePasswordHandler}>
                    <div className="password-form-item">
                        <input type="password" name='password' value={changePassword.password} onChange={updatePassChangeHandler} />
                        <label htmlFor="password">contraseña actual</label>
                    </div>
                    <div className="password-form-item">
                        <input type="password" name='newPassword' value={changePassword.newPassword} onChange={updatePassChangeHandler} />
                        <label htmlFor="newPassword">nueva contraseña</label>
                    </div>

                    <div className="user-form-btn-container">
                        <Button type='submit' className='btn-session' content='CAMBIAR CONTRASEÑA' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePasswordForm