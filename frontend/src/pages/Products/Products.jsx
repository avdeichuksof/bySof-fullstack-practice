import './products.css'
import React, { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'

import { useLocation } from 'react-router-dom'
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

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const category = searchParams.get('category')

    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})

    useEffect(() => {
        const getProducts = async () => {
            try {
                let url = `${baseURL}/api/products`
                // si hay query de category, se filtra, sino se muestran todos los prods
                if (category) {
                    url += `?category=${category}`
                }

                const response = await axiosClient.getRequest({
                    url: url,
                    config: config,
                })
                if (!response) toast.error('Ocuarrió un error al cargar los productos.', {
                    duration: 5000,
                    position: 'top-right'
                })
                const data = response.data
                setProducts(data.products)
                setPagination(data.pagination)
            } catch (error) {
                console.log('Error sending request: ', error)
            }
        }
        getProducts()
    }, [category])

    const pageChangeHandler = async (page) => {
        try {
            let url = `${baseURL}/api/products`
            if (category) {
                url += `?category=${category}`
            }
            url += `&page=${page}`
            const response = await axiosClient.getRequest({
                url: url,
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

    // ordenar productos por precio
    const sortProductsPriceHandler = async (sort) => {
        try {
            let url = `${baseURL}/api/products`
            // si hay sort, se filtran por precio
            if (sort) {
                url += `?sort=${sort}`
            }
            const response = await axiosClient.getRequest({
                url: url,
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

    const [click, setClick] = useState(false)

    const clickHandler = () => {
        setClick(!click)
    }

    return (
        <div className='container-products'>

            <div className="products-sort">
                <button className={`${click ? 'open' : 'close'} sort-btn`} onClick={clickHandler}>
                    Ordenar por
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67" />
                    </svg>
                </button>
                <div className={` ${click ? 'show-options' : 'hide-options'} `}>
                    <button onClick={() => sortProductsPriceHandler('desc')} className="option">Mayor precio</button>
                    <button onClick={() => sortProductsPriceHandler('asc')} className="option">Menor Precio</button>
                </div>
            </div>

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