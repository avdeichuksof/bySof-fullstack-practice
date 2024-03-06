import Product from "../models/model-product.js"

class ProductMethods {
    getProducts = async () => {
        const products = await Product.find().lean()
        return products
    }

    getProductsPaginate = async (category, limit, page, sort) => {
        try {
            const filter = category ? {category: category} : {}
            const options = {
                limit: limit || 12,
                page: page || 1,
                sort: {
                    price: sort || 'asc' 
                }
            }

            const products = await Product.paginate(filter, options)
            return products

        } catch (error) {
            console.error(error)
            throw error
        }
    }

    getProductById = async (id) => {
        const productFound = await Product.findById(id)
        return productFound
    }

    createProduct = async (product) => {
        const newProduct = new Product(product)
        return newProduct.save()
    }

    updateProduct = async (id, newData) => {
        const updateProduct = await Product.updateOne({_id: id}, newData)
        return updateProduct
    }

    deleteProduct = async (id) => {
        const deleteProduct = await Product.deleteOne({_id: id})
        return deleteProduct
    }
}

export default ProductMethods