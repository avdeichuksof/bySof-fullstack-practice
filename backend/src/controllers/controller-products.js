import ProductService from "../services/service-products.js"
const productService = new ProductService()

class ProductController {

    getProducts = async (req, res) => {
        try {
            const products = await productService.getProducts()
            res.status(200).send({ products: products })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    /* getProductsPaginate = async (req, res) => {
        try {
            let {category, limit, page, sort} = req.query

            if(sort && (sort !== 'asc' && sort != 'desc')){
                sort = ''
            }else if (sort == 'asc'){
                sort = 1
            }else{
                sort = -1
            }

            const data = await productService.getProductsPaginate(category, limit, page, sort)

            let products = data.docs.map((product) => {
                return {
                    title: product.title,
                    price: product.price,
                    size: product.size,
                    category: product.category,
                    stock: product.stock,
                    status: product.status,
                    code: product.code
                }
            }) 

            const {docs, ...rest} = data

            let links = []

            for(let i = 1; i < rest.totalPages + 1; i++){
                links.push({label: i, href: 'http://localhost:8080/home/?page=' + i})
            }

            const user = req.session.user

            res.status(200).send({products: products, pagination: rest, links, user: user}) 
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    } */

    getProductById = async (req, res) => {
        try {
            const id = req.params.pid
            const user = req.session.user
            const productFound = await productService.getProductById(id)

            if (!productFound) return res.status(404).send({ error: 'Product not found' })

            console.log('producto: ', productFound)
            res.send({ product: productFound, user: user })
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: 'Internal server error' })
        }
    }

    createProduct = async (req, res) => {
        try {
            const newProduct = await productService.createProduct(req.body)

            res.status(201).send({ message: 'Product created', product: newProduct })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    updateProduct = async (req, res) => {
        try {
            const id = req.params.pid
            const newData = req.body
            const updateProduct = await productService.updateProduct(id, newData)

            console.log('Product updated:', updateProduct)
            res.status(200).send({ message: 'Product updated', product: updateProduct })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const id = req.params.pid
            const user = req.session.user
            await productService.deleteProduct(id, user)

            res.status(200).send({ message: 'Product deleted', productId: id })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

}

export default ProductController