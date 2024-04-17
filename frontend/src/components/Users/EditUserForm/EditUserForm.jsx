import './editUserForm.css'
import React from 'react'
import Button from '../../Buttons/Button'

const EditUserForm = ({onSubmit, onChange, value, btnText, currentUserData}) => {

    return (
        <div className="user-form-container">
            <h2 className='user-form-subtitle'>Editar Datos</h2>
            <form onSubmit={onSubmit}>
                <div className="user-form-item">
                    <label htmlFor="firstName">nombre</label>
                    <input type="text" name='firstName' value={value.firstName} onChange={onChange} placeholder={currentUserData?.firstName}/>
                </div>
                <div className="user-form-item">
                    <label htmlFor="lastName">apellido</label>
                    <input type="text" name='lastName' value={value.lastName} onChange={onChange} placeholder={currentUserData?.lastName}/>
                </div>
                <div className="user-form-item">
                    <label htmlFor="email">email</label>
                    <input type="email" name='email' value={value.email} onChange={onChange} placeholder={currentUserData?.email}/>
                </div>
                <div className="user-form-item">
                    <label htmlFor="age">edad</label>
                    <input type="number" name='age' value={value.age} onChange={onChange} placeholder={currentUserData?.age}/>
                </div>
                
                <div className="user-form-btn-container">
                    <Button className='btn-session' type='submit' content={btnText} />
                </div>
            </form>
        </div>
    )
}

export default EditUserForm