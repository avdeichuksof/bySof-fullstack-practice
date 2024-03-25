import './productCard.css'
import React, { useState } from 'react'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../Buttons/Button'
import { getCurrentUser } from '../../../utils/getCurrentUser'


const ProductCard = ({ product }) => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    /* ADD TO CART */

    // buscamos el carrito del usuario
    const userData = getCurrentUser()
    const userCart = userData ? userData.cart : null

    // add to cart
    const addProdForm = {
        quantity: 1
    }

    const [addProd, setAddProd] = useState(addProdForm)
    const addToCartHandler = async (e) => {
        e.preventDefault()

        if (!userCart) {
            console.log('Cart not found')
            return // Salir de la función si no hay un carrito definido
        }

        try {
            await axiosClient.postRequest({
                url: `${baseURL}/api/carts/${userCart}/product/${product._id}`,
                body: addProd,
                config: config,
                callbackSuccess: (res) => {
                    console.log('Product added to cart: ', res.data)
                },
                callbackError: (error) => {
                    console.log('Error adding product to cart: ', error)
                }
            })

            //si se añadió el prod, actualizamos el estado y restablecemos el estado del form
            setAddProd(addProdForm)

        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const addToCartChangeHandler = (e) => {
        const { name, value } = e.target
        const addProduct = { ...addProd, [name]: value }

        // validamos cantidad
        if (name === 'quantity') addProduct[name] = Math.max(0, parseInt(value))

        setAddProd(addProduct)
    }

    return (
        <div className="card-container">
            <img src={product.thumbnail} alt={product.title} className="card-img" />
            <div className="card-body">
                <h4 className="card-title">{product.title}</h4>
                <p className="card-size">Tamaño: {product.size}</p>
                <p className='card-price'>${product.price}</p>

                {product.stock == 0 && (
                    <p className='stock-txt'><b>Producto fuera de stock</b></p>
                )}

                <form className="prod-options" onSubmit={addToCartHandler}>
                    <input className='quantity-input' type="number" name='quantity' value={addProd.quantity} min={1} max={product.stock} onChange={addToCartChangeHandler} />

                    <Button type='submit' className='btn-products' content='Añadir al Carrito' />
                </form>
            </div>
        </div>
    )

}

export default ProductCard