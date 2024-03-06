import Cart from "../dao/models/model-cart.js"
import Ticket from "../dao/models/model-ticket.js"
import ProductService from "./service-products.js"
const productService = new ProductService()
import TicketService from "./service-tickets.js"
const ticketService = new TicketService()
import UserService from "./service-users.js"
const userService = new UserService()

class PurchaseService {
    getPurchases = async () => {
        try {
            const tickets = await ticketService.getTickets()
            return tickets
        } catch (error) {
            throw new Error(error.message)
        }
    }

    generatePurchase = async (user, cartId) => {
        try {
            const cart = await Cart.findById(cartId)

            if(cart){
                // guardamos ID de productos
                const prodsId = cart.products.map(prod => prod.product._id.toString())
                // guardamos las cantidades
                const prodsAmount = cart.products.map(q => q.quantity)
                // guardamos info
                const prodsInfo = await productService.getProductData(prodsId)

                let amount = 0
                let noStock = []
                let prodStock = []

                prodsInfo.map((product, i) => {
                    if(product){
                        const quantity = parseInt(prodsAmount[i], 10)
                        const price = parseFloat(product.price)

                        if(!isNaN(quantity) && !isNaN(price)){
                            // si ya no tiene stock lo agregamos a la lista sin stock
                            if(quantity > product.stock){
                                noStock.push({prodId: product._id, quantity: quantity})
                            }else{
                                // si hay stock, restamos lo que se compró del stock
                                const newStok = product.stock - quantity

                                // calculamos el total
                                const prodPrice = price * quantity
                                amount += prodPrice

                                // actualizamos stock
                                prodStock.push({prodId: product._id, stock: newStock})
                            }
                        }else{
                            throw new Error('Invalid quantity or price for product ID: ', prodsId[i])
                        }
                    }else{
                        throw new Error(`The product with id ${prodsId[i]} was not found`)
                    }
                })

                // creamos el ticket
                const ticket = await ticketService.createTicket({
                    amount: amount, purchaser: user
                })

                return {ticket, prodStock, noStock}
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getUserPurchases = async (userId) => {
        try {
            const purchaser = await userService.getUserById(userId)
            if (!purchaser) console.log('User not found')

            const userTickets = await Ticket.find(tkt => tkt.purchaser === purchaser)

            return userTickets
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deletePurchase = async () => {
        try {
            const ticket = await ticketService.deletePurchase()
            return ticket
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

export default PurchaseService