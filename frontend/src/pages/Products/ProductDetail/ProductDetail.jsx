import './productDetail.css'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../../components/Buttons/Button'

const ProductDetail = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // catch del producto seleccionado
    const { pid } = useParams()
    const [prodFound, setProdFound] = useState(null)

    useEffect(() => {

        const getProduct = async () => {
            try {
                const response = await axiosClient.getRequest({
                    url: `${baseURL}/api/products/${pid}`,
                    config: config
                })
                if (!response) console.log('Product ID not found')

                const data = response.data
                console.log('Product: ', data.product)
                setProdFound(data.product)
            } catch (error) {
                console.log('Error sending request: ', error)
            }
        }
        getProduct()
    }, [pid])

    /* ADD TO CART */

    // buscamos el carrito del usuario
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        axiosClient.getRequest({
            url: `${baseURL}/api/auth/currentuser`,
            callbackSuccess: (res) => {
                console.log('User Data: ', res.data.currentUser)
                setUserData(res.data.currentUser)
            },
            callbackError: (error) => {
                console.error('Error checking current user: ', error)
            }
        })
    }, [])

    const userCart = userData ? userData.cart : null

    // add to cart
    const addProdForm = {
        // size: '',
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
            const response = await axiosClient.postRequest({
                url: `${baseURL}/api/carts/${userCart}/product/${pid}`,
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
        <>
            {!prodFound && (
                <div className="prod-not-found">
                    <svg viewBox="-20 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#104B56"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M38.155 140.475L48.988 62.1108L92.869 67.0568L111.437 91.0118L103.396 148.121L38.155 140.475ZM84.013 94.0018L88.827 71.8068L54.046 68.3068L44.192 135.457L98.335 142.084L104.877 96.8088L84.013 94.0018ZM59.771 123.595C59.394 123.099 56.05 120.299 55.421 119.433C64.32 109.522 86.05 109.645 92.085 122.757C91.08 123.128 86.59 125.072 85.71 125.567C83.192 118.25 68.445 115.942 59.771 123.595ZM76.503 96.4988L72.837 99.2588L67.322 92.6168L59.815 96.6468L56.786 91.5778L63.615 88.1508L59.089 82.6988L64.589 79.0188L68.979 85.4578L76.798 81.5328L79.154 86.2638L72.107 90.0468L76.503 96.4988Z" fill="#000000"></path> </g></svg>
                    <p>No se ha encontrado el producto.</p>
                </div>
            )}

            {prodFound && (
                <div className="prod-detail">
                        <img src={prodFound.thumbnail} alt={prodFound.title} className="card-detail-img" />
                        <h4 className="card-detail-title">{prodFound.title}</h4>
                        <p className='card-detail-price'>${prodFound.price}</p>
                        <div className='prod-options-container'>
                            <form className="prod-options" onSubmit={addToCartHandler}>
                                {/* <select name="size">
                                <option value="s">chiquito</option>
                                <option value="m">mediano</option>
                                <option value="l">grande</option>
                            </select> */}

                                <input className='quantity-input' type="number" name='quantity' value={addProd.quantity} min={1} onChange={addToCartChangeHandler} />

                                <Button type='submit' className='btn-products' content='Añadir al Carrito' />
                            </form>
                        </div>
                </div>
            )}

        </>
    )
}

export default ProductDetail