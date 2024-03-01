import {Router} from 'express'
import CartController from '../controllers/controller-carts.js'
const cartController = new CartController()
import PurhcaseController from '../controllers/controller-purchases.js'
const purchaseController = new PurhcaseController()

const router = new Router()

router.get('/', cartController.getCarts)
router.get('/:cid', cartController.getCartsById)
// arreglar un get purchases para que  me devuelva las compras de un usuario especifico
router.get('/:cid/purchases', purchaseController.getPurchase)
router.get('/:cid/purchase', purchaseController.generatePurchase)

router.post('/', cartController.createCart)
router.post('/:cid/product/:pid',  cartController.addProductToCart)

router.put('/:cid', cartController.udpateCart)
router.put('/:cid/products/:pid', cartController.updateProductQuantity)
router.put('/empty/:cid', cartController.emptyCart)

router.delete('/:cid', cartController.deleteCart)
router.delete('/:cid/purchases', purchaseController.deletePurchase)
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart)

export default router