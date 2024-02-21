import './accordionItem.css'
import React, {useState} from 'react'

const AccordionItem = ({ isActive, onClick, question, answer }) => {
    /* const [open, setOpen] = useState(false)
    const accordionHandler = () => {
        setOpen(!open)
    } */

    // const isOpen = index === activeIndex

    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={onClick}>
                <p className='accordion-title'>{question}</p>
                <div className={`icon-${isActive ? 'open' : 'closed'}`}>+</div>
            </div>
            {isActive && <div className='accordion-body'>{answer}</div>}
        </div>
    )
}

export default AccordionItem