import '../../ProductCard/productCard.css'
import React from 'react'

const AdminProductCard = ({ product }) => {
    return (
            <div className="card-container">
                <img src={product.thumbnail} alt={product.title} className="card-img" />
                <div className="card-body">
                    <h4 className="card-title">{product.title}</h4>
                    <p className='card-data'><b>price:</b>${product.price}</p>
                    <p className='card-data'><b>size:</b>{product.size}</p>
                    <p className='card-data'><b> category:</b>{product. category}</p>
                    <p className='card-data'><b>stock:</b>{product.stock}</p>
                    <p className='card-data'><b>code:</b>{product.code}</p>
                </div>
            </div>
    )

}

export default AdminProductCard