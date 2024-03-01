import './products.css'
import React, { useState, useEffect } from 'react'
import AxiosClient from '../../services/axiosClient'
const axiosClient = new AxiosClient()

import ProductCard from '../../components/Products/ProductCard/ProductCard'


const Products = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosClient.getRequest({
                    url: `${baseURL}/api/products`,
                    config: config,
                })
                if (!response) console.log('Products array not found')
                const data = response.data
                setProducts(data.products)
                setPagination(data.pagination)
            } catch (error) {
                console.log('Error sending request: ', error)
            }
        }
        getProducts()
    }, [])

    const pageChangeHandler = async (page) => {
        try {
            await axiosClient.getRequest({
                url: `${baseURL}/api/products/?=page${page}`,
                config: config,
            })
            if (!response) console.log('Product not found')
            const data = response.data
            setProducts(data.products)
            setPagination(data.pagination)
        } catch (error) {
            console.log('Error sending request: ', error)
        }
    }


    return (
        <div className='container-products'>

            {/* <div className="price-filter">
                <form >

                </form>
            </div> */}

            <div className="products-list">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <div className="pagination-buttons">
                {pagination.hasPrevPage && (
                    <button className='btn-page' onClick={() => pageChangeHandler(pagination.prevPage)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                        </svg>
                    </button>
                )}
                <button className='btn-page btn-number'  >{pagination.page}</button>
                {pagination.hasNextPage && (
                    <button className='btn-page' onClick={() => pageChangeHandler(pagination.nextPage)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                        </svg>
                    </button>
                )}
            </div>

        </div>
    )
}

export default Products