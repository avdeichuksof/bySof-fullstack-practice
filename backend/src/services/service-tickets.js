import TicketMethods from '../dao/methods/methods-tickets.js'
const ticketMethods = new TicketMethods()
import ProductService from './service-products.js'
const productService = new ProductService()

class TicketService {
    getTickets = async () => {
        try {
            const tickets = await ticketMethods.getTickets()
        return tickets
        } catch (error) {
            
        }
    }

    createTicket = async (ticket) => {
        try {
            const newTicket = await ticketMethods.createTicket(ticket)
        return newTicket
        } catch (error) {
            throw new Error(err.message)
        }
    }

    updateStockAfterPurchase = async (stock) => {
        try {
            // actualizamos el stock para cada producto
            for(const product of stock){
                await productService.updateProductStock(product.id, product.stock)
                console.log('Stock updated')
            }
            return {message: 'Stock updated successfully'}
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deletePurchase = async () => {
        try {
            const ticket = await ticketMethods.deletePurchase()
            return ticket
        } catch (error) {
            throw new Error(err.message)
        }
    }
}

export default TicketService