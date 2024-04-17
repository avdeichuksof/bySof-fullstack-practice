import CartService from "../services/service-carts.js"
const cartService = new CartService()

import io from "../../main.js"

class CartController {
    getCarts = async (req, res) => {
        try {
            const carts = await cartService.getCarts()
            res.status(200).send({ carts: carts })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    getCartsById = async (req, res) => {
        try {
            const cid = req.params.cid
            const cartFound = await cartService.getCartById(cid)
            if (!cartFound) {
                res.status(404).send({ message: 'Cart not found' })
                return
            }

            res.status(200).send({ cart: cartFound })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    getTotalProducts = async (req, res) => {
        try {
            const cid = req.params.cid
            const totalProducts = await cartService.getTotalProducts(cid)

            res.status(200).send({ totalProducts: totalProducts })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    createCart = async (req, res) => {
        try {
            const newCart = await cartService.createCart()
            res.status(201).send({ message: 'Cart created', cart: newCart })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const quantity = parseInt(req.body?.quantity)
            await cartService.addProductToCart(cid, pid, quantity)

            // tomamos el total de los productos
            const totalProducts = await cartService.getTotalProducts(cid)

            io.emit('totalProds', { totalProds: totalProducts })
            io.emit('cartUpdated', { cartId: cid })

            res.status(200).send({ message: 'Product added to cart' })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    updateProductQuantity = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const quantity = req.body.quantity

            const newQuantity = await cartService.updateProductQuantity(cid, pid, quantity)
            console.log('Product quantity updated')

            // tomamos el total de los productos
            const totalProducts = await cartService.getTotalProducts(cid)

            io.emit('totalProds', { totalProds: totalProducts })
            io.emit('cartUpdated', { cartId: cid })

            res.status(200).json({ newQuantity: newQuantity, totalProducts: totalProducts })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    udpateCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const userCart = req.body
            const cartFound = await cartService.getCartById(cid)
            if (cartFound) {
                await cartService.updateCart(cid, null, userCart)
                res.status(201).send({ message: 'Cart updated', cartFound })
            } else {
                res.status(404).send({ message: 'Cart not found' })
            }
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    emptyCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const cartEmpty = await cartService.emptyCart(cid)

            // tomamos el total de los productos
            const totalProducts = await cartService.getTotalProducts(cid)

            io.emit('totalProds', { totalProds: totalProducts })
            io.emit('cartUpdated', { cartId: cid })

            res.status(200).send({ message: 'Empty cart', cart: cartEmpty })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const pid = req.params.pid
            const cid = req.params.cid

            const deletedProd = await cartService.deleteProductFromCart(cid, pid)
            // no se encontró el prod
            if (deletedProd.message) {
                res.status(404).send({ error: deletedProd.message })
            } else {
                // tomamos el total de los productos
                const totalProducts = await cartService.getTotalProducts(cid)

                io.emit('totalProds', { totalProds: totalProducts })
                io.emit('cartUpdated', { cartId: cid })

                res.status(200).send({ message: 'Product deleted from cart', deletedProd: deletedProd })
            }

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    deleteCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const deleteCart = await cartService.deleteCart(cid)
            res.status(200).send({ message: 'Cart deleted', cart: deleteCart })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

}

export default CartController

