import './editProfile.css'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import editIllustration from '../../../img/undraw_profile_data_re_v81r.svg'
import EditUserForm from '../../../components/Users/EditUserForm/EditUserForm'
import ChangePasswordForm from '../../../components/Users/ChangePassword/ChangePasswordForm'

import { getCurrentUser } from '../../../utils/getCurrentUser'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()



const EditProfile = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const editUserForm = {
        firstName: '',
        lastName: '',
        email: '',
        age: ''
    }

    // ----------------- get current data
    const user = getCurrentUser()
    const userId = user ? user.id : null

    const [updated, setUpdated] = useState(editUserForm)
    const [isDataEntered, setIsDataEntered] = useState(false)

    const editUsertHandler = async (e) => {
        e.preventDefault()

        console.log('userId: ', userId)

        try {
            await axiosClient.putRequest({
                url: `${baseURL}/api/users/edit/${userId}`,
                body: updated,
                config: config,
                callbackSuccess: (res) => {
                    toast.success('Perfil actualizado.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                },
                callbackError: (error) => {
                    toast.error('Ocurrió un error al actualizar perfil.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const updateUserChangeHandler = (e) => {
        const { name, value } = e.target
        const updateUser = { ...updated, [name]: value }

        // validamos datos
        if (name === 'age') updateUser[name] = Math.max(0, parseInt(value))

        setUpdated(updateUser)

        // Verificar si se han ingresado datos
        setIsDataEntered(Object.values(updateUser).some(val => val !== ''))
    }

    return (
        <div className="edit-profile-container">
            <Toaster />

            <h1 className='edit-profile-title'>Editar Perfil</h1>

            <div className="forms-container">
                <div className="subcontainer">
                    <EditUserForm onSubmit={editUsertHandler} onChange={updateUserChangeHandler} value={updated} btnText={'GUARDAR CAMBIOS'} currentUserData={user} disabled={!isDataEntered} />
                    <img className='edit-illustration' src={editIllustration} alt="ilustración" />
                </div>
                <ChangePasswordForm />
            </div>
        </div>
    )
}

export default EditProfile