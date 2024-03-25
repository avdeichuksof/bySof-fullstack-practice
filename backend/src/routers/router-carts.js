import {Router} from 'express'
import CartController from '../controllers/controller-carts.js'
const cartController = new CartController()
import PurhcaseController from '../controllers/controller-purchases.js'
const purchaseController = new PurhcaseController()

const router = new Router()

router.get('/', cartController.getCarts)
router.get('/:cid', cartController.getCartsById)
router.get('/:cid/items', cartController.getTotalProducts)

router.get('/:cid/purchases', purchaseController.getPurchase)
router.get('/:cid/purchase', purchaseController.generatePurchase)
router.get('/:cid/:uid/purchases', purchaseController.getUserPurchases)

router.post('/', cartController.createCart)
router.post('/:cid/product/:pid',  cartController.addProductToCart)

router.put('/:cid', cartController.udpateCart)
router.put('/empty/:cid', cartController.emptyCart)
router.put('/:cid/product/:pid', cartController.updateProductQuantity)

router.delete('/:cid', cartController.deleteCart)
router.delete('/:cid/purchases', purchaseController.deletePurchase)
router.delete('/:cid/product/:pid', cartController.deleteProductFromCart)

export default router