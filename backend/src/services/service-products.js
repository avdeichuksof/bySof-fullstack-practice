import ProductMethods from '../dao/methods/methods-products.js'
const productMethods = new ProductMethods()

class ProductService {

    #productExists = async (id) => {
        const productFound = await productMethods.getProductById(id)
        if (!productFound) throw new Error('Product not found, invalid ID')
        return productFound
    }

    getProducts = async () => {
        try {
            const products = await productMethods.getProducts()
            return products
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    getProductsPaginate = async (category, limit, page, sort) => {
        try {
            const products = await productMethods.getProductsPaginate(category, limit, page, sort)
            return products
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    getProductById = async (id) => {
        try {
            const productFound = await productMethods.getProductById(id)
            return productFound
        } catch (error) {
            console.log(error)
            throw new Error('Product not found', error)
        }
    }

    getProductData = async (array) => {
        const productData = []

        // recorremos el array recibido (de productos) por cada id
        for (const id of array) {
            const productFound = await this.getProductById(id)
            // guardamos la data del producto en productData
            productData.push(productFound)
        }

        return productData
    }


    createProduct = async (newProduct) => {
        try {
            // validamos todos los campos necesarios
            if (!newProduct.title, !newProduct.thumbnail, !newProduct.price, !newProduct.size, !newProduct.category, !newProduct.subcategory, !newProduct.stock, !newProduct.code) {
                throw new Error('Error creating product. All fields must be completed')
            }

            // si está ok, creamos producto
            const product = await productMethods.createProduct(newProduct)
            if (product) console.log({ message: 'Product created successfully', product: product })

            return product
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateProduct = async (id, newData) => {
        try {
            const productFound = await this.#productExists(id)
            const updateProduct = await productMethods.updateProduct(id, newData)
            if (updateProduct) console.log({ message: 'Product updated successfully', product: productFound })

            return updateProduct
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateProductStock = async (id, stock) => {
        try {
            await this.#productExists(id)

            const newStock = await productMethods.updateProduct(id, { stock: stock })
            if (newStock) console.log({ message: 'Stock updated successfully' })

            return newStock
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteProduct = async (id, currentUser) => {
        try {
            // buscamos el prod a eliminar por ID
            const productFound = await this.#productExists(id)

            // validamos que solo el admin pueda borrar productos
            if (currentUser.role === 'admin') {
                const deletedProduct = await productMethods.deleteProduct(id)
                if (deletedProduct) console.log({ message: 'Product has been removed successfully', product: productFound })
            } else {
                console.log('Error deleting product. You are not an admin')
                return false
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

export default ProductService