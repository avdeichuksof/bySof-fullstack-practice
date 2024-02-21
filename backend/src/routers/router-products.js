import ProductController from '../controllers/controller-products.js'
const productController = new ProductController()
import { Router } from "express"
const router = new Router()
import {isAdmin} from  '../utils/middlewares.js'

router.get('/', productController.getProducts)
router.get('/:pid', productController.getProductById)

router.post('/', productController.createProduct)

router.put('/:pid',  productController.updateProduct)

router.delete('/:pid', productController.deleteProduct)


export default router