import ProductController from '../controllers/controller-products.js'
const productController = new ProductController()
import { Router } from "express"
const router = new Router()
import {isAdmin} from  '../utils/middlewares.js'

router.get('/', productController.getProductsPaginate)
router.get('/:pid', productController.getProductById)

router.post('/', isAdmin, productController.createProduct)

router.put('/:pid', isAdmin, productController.updateProduct)

router.delete('/:pid', isAdmin, productController.deleteProduct)


export default router