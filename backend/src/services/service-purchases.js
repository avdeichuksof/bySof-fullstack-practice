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
            // buscamos el carrito del usuario
            const cart = await Cart.findById(cartId)
            console.log('Cart found service: ', cart)

            // si existe el carrito
            if(cart){
                // guardamos ID de productos
                const prodsId = cart.products.map(prod => prod.product._id.toString())
                console.log('prodsId service: ', prodsId)
                // guardamos las cantidades
                const prodsAmount = cart.products.map(q => q.quantity)
                console.log('prodsAmount service: ', prodsAmount)
                // guardamos info de cada producto
                const prodsInfo = await productService.getProductData(prodsId)
                console.log('prodsInfo service: ', prodsInfo)

                let amount = 0
                let noStock = []
                let prodStock = []

                // verificamos stocks y precio total antes de la compra
                prodsInfo.map((product, i) => {
                    if(product){
                        // parseamos cantidad y precio para evitar errores
                        const quantity = parseInt(prodsAmount[i], 10)
                        const price = parseFloat(product.price)

                        console.log('Product data service: ', quantity, price)
                        
                        if(!isNaN(quantity) && !isNaN(price)){
                            if(quantity <= product.stock){
                                // si hay stock, restamos lo que se compró del stock
                                const newStock = product.stock - quantity
                                console.log('NewStock service: ', newStock)

                                // calculamos el total
                                amount += price * quantity
                                
                                // actualizamos stock
                                prodStock.push({prodId: product._id, stock: newStock})
                            }else{
                                // si ya no tiene stock lo agregamos a la lista sin stock
                                noStock.push({prodId: product._id, quantity: quantity})
                                console.log('Product out of stock')
                            }
                        }else{
                            throw new Error('Invalid quantity or price for product ID: ', prodsId[i])
                        }
                    }else{
                        throw new Error(`The product with id ${prodsId[i]} was not found`)
                    }
                })

                // guardamos fecha de compra
                const purchaseDatetime = Date.now()

                // creamos el ticket
                const ticket = await ticketService.createTicket({
                    amount: amount, purchaser: user, date: purchaseDatetime
                })

                console.log('ticket service: ', ticket)
                console.log('prodStock service: ', prodStock)
                console.log('noStock service: ', noStock)
                return {ticket, prodStock, noStock}
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getUserPurchases = async (userId) => {
        try {   
            // buscamos comprador por ID
            const purchaser = await userService.getUserById(userId)
            if (!purchaser) console.log('User not found')
            
            // obtenemos sus compras realizadas
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