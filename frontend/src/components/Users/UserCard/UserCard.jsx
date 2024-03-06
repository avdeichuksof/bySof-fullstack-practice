import './userCard.css'
import React from 'react'

const UserCard = ({ user }) => {
    return (
        <div className="user-info-container">
            <div className="user-info">
                <p><b>_id: </b> {user._id}</p>
                <p><b>username: </b> {user.firstName} {user.lastName}</p>
                <p><b>email: </b> {user.email}</p>
                <p><b>role: </b> {user.role}</p>
                <p><b>age: </b> {user.age}</p>
                <p><b>cart: </b> {user.cart}</p>
                <p><b>last connection: </b> {user.lastConnection}</p>
            </div>
        </div>
    )
}

export default UserCard