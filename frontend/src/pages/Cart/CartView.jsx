import './cartView.css'
import React, { useEffect, useState } from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const CartView = () => {
    const baseURL = 'http://localhost:8080'

    // tomamos los datos del usuario
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        axiosClient.getRequest({
            url: `${baseURL}/api/auth/currentuser`,
            callbackSuccess: (res) => {
                setUserData(res.data.currentUser)
            },
            callbackError: (error) => {
                console.error('Error checking current user: ', error)
            }
        })
    }, [])

    const userCart = userData ? userData.cart : null

    // tomamos el cart
    const [cart, setCart] = useState(null)

    useEffect( () => {
        if(userCart) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
    
            axiosClient.getRequest({
                url: `${baseURL}/api/carts/${userCart}`,
                config: config,
                callbackSuccess: (res) => {
                    setCart(res.data.cart)
                },
                callbackError: (error) => {
                    if (error.response && error.response.status === 404) {
                        console.log('Cart not found')
                        setCart(null)
                    } else {
                        console.error('Error rendering cart: ', error);
                    }
                }
            })
        }
    }, [userCart])

    const cartView = cart ? cart : null

    return (
        <div className="cartView">
            <h1>Hola soy cart {cartView ? cartView._id : 'Empty Cart'}</h1>
        </div>
    )

}

export default CartView