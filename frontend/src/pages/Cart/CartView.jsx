import './cartView.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../components/Buttons/Button'
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

    // ---------------------------- vaciar carrito
    const [emptyCart, setEmptyCart] = useState(null)

    const emptyCartHandler = async () => {
        try {
            await axiosClient.putRequest({
                url: `${baseURL}/api/carts/empty/${userCartId}`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('Cart emptied successfully', res.data)
                    setEmptyCart(true)
                    setCartProducts([])
                },
                callbackError: (error) => {
                    console.log('Error emptying cart', error)
                    setEmptyCart(false)
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    // ----------------------------------- precio total
    const [totalPrice, setTotalPrice] = useState('')

    const getTotalPrice = () => {
        try {
            if (products.length > 0) {
                const total = products.reduce((acum, product) => {
                    const productQuantity = product.quantity;
                    const productPrice = product.product.price;
                    return acum + (productQuantity * productPrice);
                }, 0);
                setTotalPrice(total);
            } else {
                setTotalPrice(0);
            }
        } catch (error) {
            console.error('Error getting total price: ', error);
        }
    }

    // llamamos a totalPrice cuando se monta cartProducts
    useEffect(() => {
        getTotalPrice()
    }, [cartProducts])


    // ------------------------- actualiza el carrito al eliminar un prod
    const deleteProdHandler = (prodId) => {
        const updatedProds = cartProducts.filter(product => product.product._id !== prodId)
        setCartProducts(updatedProds)
    }

    // --------------------------- actualiza el carrito al cambiar la cantidad
    const onQuantityChangeHandler = (prodId, quantity) => {
        const updatedProds = cartProducts.map(product => {
            if (product.product._id === prodId) {
                return { ...product, quantity: quantity }
            }
            return product;
        })
        setCartProducts(updatedProds)
    }


    // ----------------------------- comprar
    const [purchased, setPurchased] = useState(null)
    /* const [purchaseCode, setPurchaseCode] = useState('') */
    const generatePurchaseHandler = async () => {
        try {
            await axiosClient.getRequest({
                url: `${baseURL}/api/carts/${userCartId}/purchase`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('Purchase generated: ', res.data)
                    setPurchased(true)
                    // setPurchaseCode(res.data.ticket.id)
                },
                callbackError: (error) => {
                    console.log('There was an error generating purchase: ', error)
                    setPurchased(false)
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }




    return (
        <div className="cart-view-container">
            <h1 className='title-cart'>Mi Carrito</h1>

            {userCart && products.length !== 0 ? (
                <div className="cart-view">

                    {/* {purchaseCode !== '' && (
                        <div className="purchase-code-txt">
                            <h3>¡Compra realizada con éxito!</h3>
                            <span>Su código de compra es: {purchaseCode}</span>
                        </div>
                    )} */}

                    <div className="empty-cart-btn-container" onClick={emptyCartHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-dash" viewBox="0 0 16 16">
                            <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                        <p className='btn-empty-cart' >Vaciar Carrito</p>
                    </div>

                    <div className='cart-items'>
                        {products.map((product, index) => (
                            <div key={index}>
                                <CartProductCard product={product.product} quantity={product.quantity} onDelete={deleteProdHandler} onQttyChange={onQuantityChangeHandler} />
                            </div>
                        ))}
                    </div>
                    <div className="cart-actions">
                        <div className="total-container">
                            <p className='total-txt'><b>TOTAL:</b></p>
                            <p className='total'>${totalPrice}</p>
                        </div>
                        <div className="cart-btns-container">
                            <Link to='/products'><Button type='button' className='btn-products' content='Seguir Comprando' /></Link>

                            <Button type='button' className='btn-products' content='Finalizar Compra' onClick={generatePurchaseHandler} />
                        </div>
                    </div>

                </div>


            ) : (
                <div className='error-container'>
                    <div className="empty-cart-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-bag-x" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708" />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                        </svg>
                    </div>
                    <p className='error-txt'>El carrito está vacío</p>
                    <Link to='/products'><Button type='button' className='btn-products' content='Ver Productos' /></Link>
                </div>
            )}

        </div>
    )

}

export default CartView