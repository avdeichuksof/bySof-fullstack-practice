import ProductController from '../controllers/controller-products.js'
const productController = new ProductController()
import { Router } from "express"
const router = new Router()

router.get('/', productController.getProducts)

export default router