import './cartView.css'
import React, { useEffect, useState } from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import { getCurrentUser } from '../../utils/getCurrentUser'
import CartProductCard from '../../components/Cart/CartProductCard/CartProductCard'

const CartView = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    // tomamos los datos del usuario
    const userData = getCurrentUser()
    const userCartId = userData ? userData.cart : null

    // tomamos el cart
    const [cartFound, setCartFound] = useState(null)
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        if (userCartId) {

            axiosClient.getRequest({
                url: `${baseURL}/api/carts/${userCartId}`,
                config: config,
                callbackSuccess: (res) => {
                    setCartFound(res.data.cart)
                    setCartProducts(res.data.cart.products)
                },
                callbackError: (error) => {
                    if (error.response && error.response.status === 404) {
                        console.log('Cart not found')
                        setCartFound(null)
                        setCartProducts([])
                    } else {
                        console.error('Error rendering cart: ', error);
                    }
                }
            })
        }
    }, [userCartId])

    const userCart = cartFound ? cartFound : null
    const products = cartProducts ? cartProducts : null
    
    //vaciar carrito
    // comprar


    return (
        <div className="cart-view-container">
            <h1 className='title-cart'>Mi Carrito</h1>

            {userCart && products.length !== 0 ? (
                products.map((product, index) => (
                    <div key={index}>
                        <CartProductCard product={product}/>
                    </div>
                ))
            ) : (
                <>
                    <p className='error-txt'>El carrito está vacío</p>
                    <button>Ver Productos</button>
                </>
            )}

        </div>
    )

}

export default CartView