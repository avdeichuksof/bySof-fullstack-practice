
import './cartProductCard.css'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()

import { getCurrentUser } from '../../../utils/getCurrentUser'

const CartProductCard = ({ product, quantity, onDelete, onQttyChange }) => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // tomamos los datos del usuario para tomar el cartId
    const userData = getCurrentUser()
    const userCartId = userData ? userData.cart : null


    // -------------------- update quantity

    const updateProductQuantityHandler = async (newQuantity) => {
        try {
            await axiosClient.putRequest({
                url: `${baseURL}/api/carts/${userCartId}/product/${product._id}`,
                body: { quantity: newQuantity },
                config: config,
                callbackSuccess: (res) => {
                    toast.success('Cantidad actualizada.', {
                        duration: 5000,
                        position: 'top-right',
                    })
                    onQttyChange(product._id, newQuantity)
                },
                callbackError: (error) => {
                    console.log('Error updating product quantity: ', error)
                    toast.error('Ocurrió un error al actualizar la cantidad.', {
                        duration: 5000,
                        position: 'top-right',
                    })
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const decreaseQtty = async () => {
        if (quantity > 1) {
            const updatedQuantity = quantity - 1
            updateProductQuantityHandler(updatedQuantity)
        }
    }

    const increaseQtty = async () => {
        if (quantity < product.stock) {
            const updatedQuantity = quantity + 1
            updateProductQuantityHandler(updatedQuantity)
        } else {
            console.log('Product stock reached')
        }
    }


    // ---------------------- eliminar del carrito

    const deleteFromCartHandler = async () => {
        try {
            console.log(userCartId, product._id)
            const response = await axiosClient.deleteRequest({
                url: `${baseURL}/api/carts/${userCartId}/product/${product._id}`,
                config: config,
            })

            if (response.status === 200 && response.data) {
                toast.success('Producto eliminado del carrito.', {
                    duration: 5000,
                    position: 'top-right',
                })
                onDelete(product._id)
            } else {
                toast.error('Ocurrió un error al eliminar el producto.', {
                    duration: 5000,
                    position: 'top-right',
                })
            }

        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }



    return (
        <>
            <Toaster />
            <div className="cart-prod-container">
                <div className="btn-delete-prod">
                    <button onClick={deleteFromCartHandler}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg></button>
                </div>
                <div className="cart-prod-card">
                    <img className='cart-prod-img' src={product.thumbnail} alt={product.title} />
                    <div className="info-txt">
                        <div className="cart-prod-txt">
                            <h4>{product.title}</h4>
                            <p className='cart-prod-size'>Tamaño: {product.size}</p>
                        </div>
                        <div className="cart-prod-price">
                            <p>${product.price}</p>
                        </div>
                    </div>
                </div>
                <div className="change-prod-quantity">
                    <button onClick={decreaseQtty}>-</button>
                    <p> {quantity} </p>
                    <button onClick={increaseQtty}>+</button>
                </div>
            </div>
        </>
    )
}

export default CartProductCard
