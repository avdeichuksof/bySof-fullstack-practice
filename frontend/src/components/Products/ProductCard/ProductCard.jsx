import './productCard.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../Buttons/Button'

const ProductCard = ({ product }) => {

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

                <Link to={`/products/${product._id}`}>
                    <Button className='btn-products' content='Ver Producto' />
                </Link>


            </div>
        </div>
    )

}

export default ProductCard