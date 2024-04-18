import './paymentForm.css'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
// import {createAlert, createAlertWithCallback} 

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const submitHandler = async (e) => {
        e.preventDefault()

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements, 
            redirect: 'if_required'
        })

        if(!error) {
            // ALERT
        } else {
            console.log(error)
            // ALERT
        }
    }

    return (
        <div className="payment-form-container">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <div className='payment-btn-container'>
                    <button className='btn-payment'>Pagar</button>
                </div>

            </form>
        </div>
    )

}

export default PaymentForm