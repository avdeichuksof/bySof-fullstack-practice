import './burgerMenu.css'
import React from 'react'

const BurguerMenu = (props) => {
    return (
        <div onClick={props.clickHandler} 
        className={`burguer-icon ${props.click ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default BurguerMenu;