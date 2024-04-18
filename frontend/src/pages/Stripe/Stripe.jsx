import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Wrapper from '../../components/PaymentForm/Wrapper'
import PaymentForm from '../../components/PaymentForm/PaymentForm'
import PaymentService from '../../services/paymentService'
const paymentService = new PaymentService()
import CartProductCard from '../../components/Cart/CartProductCard/CartProductCard'
import { getCurrentUser } from '../../utils/getCurrentUser'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

const stripeKey = 'pk_test_51OH69jFi3uRHAtIkUVMlf6yI3ElEPacebhpxgSc83MToixDejN5fk1Z6Z6DYMsHuvQBwZe49hoCij8gDAFM0sBz300Pgnr20Gy'
const stripePromise = loadStripe(stripeKey)

const Stripe = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const [currentProduct, setCurrentProduct] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)

    // get user cart

    const user = getCurrentUser()
    const cart = user ? user.cart : null

    const [cartFound, setCartFound] = useState(null)
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        const getUserCart = async () => {
            try {
                await axiosClient.getRequest({
                    url: `${baseURL}/api/carts/${cart._id}`,
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
            } catch (error) {
                console.error('Error sending request: ', error)
            }
        }
        getUserCart()
    }, [cart])

    const userCart =  cartFound ? cartFound : []

    useEffect(() => {
        const getClientSecret = async () => {
            console.log(currentProduct)
            try {
                paymentService.createPaymentIntent({
                    prodId: currentProduct?._id,
                    callbackSuccess: (res) => {
                        setClientSecret(res.data.payload.client_secret)
                    },
                    callbackError: (error) => {
                        console.log(error)
                    }
                })
            } catch (error) {
                console.error('Error sending stripe request: ', error)
            }
        }

        currentProduct && getClientSecret()
    }, [currentProduct])
    
    return (
        <div className="stripe-container">
            <h1 className="stripe-title">Finaliza tu compra</h1>

            <div className="stripe-content">
                <Wrapper hidden={currentProduct}>
                    <div className="stripe-products-container">
                        {userCart.map(product => 
                            <CartProductCard key={product._id} product={product}  />
                        )}
                    </div>
                </Wrapper>
                <Wrapper hidden={!clientSecret || !stripePromise}>
                    <Elements stripe={stripePromise} options={{clientSecret: clientSecret}}>
                        <PaymentForm />
                    </Elements>
                </Wrapper>
            </div>
        </div>
    )

}

export default Stripe