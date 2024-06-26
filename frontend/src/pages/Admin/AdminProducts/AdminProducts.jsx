import '../administration.css'
import React, { useState } from "react"
import toast, {Toaster} from 'react-hot-toast'
import AxiosClient from '../../../services/axiosClient'
const axiosClient = new AxiosClient()

import Button from '../../../components/Buttons/Button'
import AdminProductsForm from '../../../components/Products/Admin/AdminProductsForm'
import AdminProductCard from '../../../components/Products/Admin/AdminProductCard/AdminProductCard'

const AdminProducts = () => {
    const baseURL = 'http://localhost:8080'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const createProductForm = {
        title: '',
        thumbnail: '',
        price: '',
        size: '',
        category: '',
        subcategory: '',
        stock: '',
        code: ''
    }

    const editProductForm = {
        title: '',
        thumbnail: '',
        price: '',
        size: '',
        category: '',
        subcategory: '',
        stock: '',
        code: ''
    }

    const getProductById = {
        id: ''
    }


    // ------------------------------------ create product
    const [createProduct, setCreateProduct] = useState(createProductForm)
    const createProductHandler = async (e) => {
        e.preventDefault()

        try {
            await axiosClient.postRequest({
                url: `${baseURL}/api/products`,
                body: createProduct,
                config: config,
                callbackSuccess: (res) => {
                    toast.success('Producto creado.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                },
                callbackError: (error) => {
                    toast.error('Error al crear producto.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const createProductChangeHandler = (e) => {
        const { name, value } = e.target
        const createNewProduct = { ...createProduct, [name]: value }

        // validamos numbers
        if (name === 'price' || name === 'stock') createNewProduct[name] = Math.max(0, parseInt(value))

        setCreateProduct(createNewProduct)
    }


    // --------------------------- get product ID
    const [prodFound, setProdFound] = useState(getProductById)
    const [productId, setProductId] = useState('')
    const [showOptions, setShowOptions] = useState(null)

    const getProdByIdHandler = async (e) => {
        e.preventDefault()

        // validamos formato del ID
        if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
            console.error('Invalid ID format');
            setProdFound('')
        }

        try {
            const response = await axiosClient.getRequest({
                url: `${baseURL}/api/products/${productId}`,
                config: config,
                callbackSuccess: (res) => {
                    setProdFound(res.data.product)
                    setShowOptions(true)
                },
                callbackError: (error) => {
                    toast.error('Producto no encontrado. ID inválido.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                    setShowOptions(false)
                    setProdFound({})
                    setProductId('')
                }
            })

            // Actualiza productId solo si se encuentra un producto
            if (response && response.data && response.data.product) setProductId(response.data.product.id)
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const prodIdChangeHandler = (e) => {
        const { value } = e.target
        setProdFound({ ...prodFound, id: value })
        setProductId(value)
    }

    console.log('ProdID: ', productId)

    // ---------------------------- edit product
    const [updated, setUpdated] = useState(editProductForm)

    const editProductHandler = async (e) => {
        e.preventDefault()

        try {

            await axiosClient.putRequest({
                url: `${baseURL}/api/products/${productId}`,
                body: updated,
                config: config,
                callbackSuccess: (res) => {
                    toast.success('Producto actualizado.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                },
                callbackError: (error) => {
                    toast.error('Error al actualizar producto.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }

    const updateProductChangeHandler = (e) => {
        const { name, value } = e.target
        const updateProduct = { ...updated, [name]: value }

        // validamos numbers
        if (name === 'price' || name === 'stock') updateProduct[name] = Math.max(0, parseInt(value))

        setUpdated(updateProduct)
    }

    const [showEditForm, setShowEditForm] = useState(false)

    const showEditFormHandler = () => {
        setShowEditForm(true)
    }


    // ------------------------------- delete product
    const deleteProductHandler = async () => {
        try {
            if (!productId) {
                console.log('Product ID is not available or invalid')
                return
            }

            await axiosClient.deleteRequest({
                url: `${baseURL}/api/products/${productId}`,
                config: config,
                callbackSuccess: (res) => {
                    toast.success('Producto eliminado.', {
                        duration: 5000,
                        position: 'top-right'
                    })
                },
                callbackError: (error) => {
                    if (error.response && error.response.status === 404) {
                        toast.error('Error al eliminar producto. ID inválido.', {
                            duration: 5000,
                            position: 'top-right'
                        })
                    }
                }
            })
        } catch (error) {
            console.error('Error sending request: ', error)
        }
    }


    return <div className='admin-container'>
        <Toaster />
        <h1 className='admin-title'>Administración de Productos</h1>

        <div className="create-product">
            <h2>Crear Producto</h2>
            <AdminProductsForm onSubmit={createProductHandler} onChange={createProductChangeHandler} value={createProduct} btnText={'CREAR PRODUCTO'} />
        </div>

        <div className="get-id">
            <h2>Buscar producto por ID</h2>
            <form onSubmit={getProdByIdHandler}>
                <div className="product-form-item">
                    <input type="text" name='id' value={productId || ''} onChange={prodIdChangeHandler} required />
                    <label htmlFor="id">ID</label>
                </div>
                <div className="btns-container">
                    <Button className='btn-session' type='submit' content='BUSCAR PRODUCTO' />
                </div>
            </form>
        </div>

        {showOptions && prodFound && (
            <>
                <h2 className='prod-found'>Producto encontrado:</h2>
                <AdminProductCard product={prodFound} />

                <div className="btns-container">
                    <Button className='btn-session' onClick={showEditFormHandler} content='EDITAR PRODUCTO' />
                    <Button className='btn-session' onClick={deleteProductHandler} content='ELIMINAR PRODUCTO' />
                </div>

                {showEditForm && (
                    <div className='edit-product'>
                        <h2>Editar producto</h2>
                        <AdminProductsForm onSubmit={editProductHandler} onChange={updateProductChangeHandler} value={updated} btnText={'EDITAR PRODUCTO'} />
                    </div>
                )}

            </>
        )}

        {showOptions === false && (
            <p className='error-txt'>No se ha encontrado ningún producto con ese ID. Por favor, inténtelo nuevamente.</p>
        )}

    </div>
}

export default AdminProducts