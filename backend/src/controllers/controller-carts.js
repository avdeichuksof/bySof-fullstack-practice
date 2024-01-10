import CartService from "../services/service-carts.js"
const cartService = new CartService()
import TicketService from "../services/service-tickets.js"
const ticketService = new TicketService()

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
            res.status(200).send({ cartFound: cartFound })
        } catch (error) {
            res.status(404).send({ error: error })
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
            const quantity = parseInt(req.body.quantity)
            await cartService.addProductToCart(cid, pid, quantity)
            res.status(200).send({ message: 'Product added to cart' })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    updateProductQuantity = async (req, res) => {
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const quantity = req.body
            const newQuantity = await cartService.updateProductQuantity(cid, pid, quantity)
            res.status(200).send({ message: 'Quantity updated' })
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
            res.status(400).send({error: error})
        }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const pid = req.params.pid
            const cid = req.params.cid
            const deleteProduct = await cartService.deleteProductFromCart(cid, pid)
            res.status(200).send({message: 'Product deleted from cart', productt: deleteProduct})
        } catch (error) {
            res.status(400).send({error: error})
        }
    }

    deleteCart = async (req, res) => {
        try {
            const cid = req.params.cid
            const deleteCart = await cartService.deleteCart(cid)
            res.status(200).send({message: 'Cart deleted', cart: deleteCart})
        } catch (error) {
            res.status(400).send({error: error})
        }
    }

}

export default CartController

