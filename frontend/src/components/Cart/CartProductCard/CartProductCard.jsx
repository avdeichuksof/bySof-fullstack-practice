import './cartProductCard.css'
import React from 'react'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()

// update quantity
// eliminar del carrito

const CartProductCard = ({ product }) => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return (
        <div className="cart-prod-container">
            <div className="cart-prod-card">
                <div className="mobile-btn-delete-prod">
                    <button>X</button>
                </div>
                <div className="cart-prod-info">
                    <img className='cart-prod-img' src={product.product.thumbnail} alt={product.product.title} />
                    <div className="info-txt">
                        <h4>{product.product.title}</h4>
                        <p>Tamaño: {product.product.size}</p>
                    </div>
                </div>
                <div className="change-prod-quantity">
                    <form className="prod-quantity" /* onSubmit={addToCartHandler} */>
                        <label htmlFor="quantity">Cantidad: </label>
                        <input className='cart-quantity-input' type="number" name='quantity' value={product.quantity} min={1} max={product.stock}  /*onChange={addToCartChangeHandler} */ />
                    </form>
                </div>
                <div className="cart-prod-price">
                    <p>${product.product.price}</p>
                </div>
            </div>
            <div className="btn-delete-prod">
                <button>X</button>
            </div>
        </div>


    )

}

export default CartProductCard