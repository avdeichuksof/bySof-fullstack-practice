import './button.css'
import React from 'react'

const Button = ({ className, onClick, type, content}) => {
    return (
        <button className={className} onClick={onClick}  type={type}>{content}</button>
    )
}

export default Button