import PurcahseService from '../services/service-purchases.js'
const purchaseService = new PurcahseService()
import CartService from '../services/service-carts.js'
const cartService = new CartService()
import TicketService from '../services/service-tickets.js'
const ticketService = new TicketService()
import EmailController from './controller-emails.js'
const emailController = new EmailController()

class PurchaseController {
    getPurchase = async (req, res) => {
        try {
            const ticket = await purchaseService.getPurchases()
            res.status(200).send(ticket)
        } catch (error) {
            res.status(500).send({error: error})
        }
    }

    generatePurchase = async (req, res) => {
        try {
            const cid = req.params.cid
            const user = req.session.user.email

            // buscamos el carrito del usuario
            const cartFound = await cartService.getCartById(cid)
            console.log('cartFound controller: ', cartFound)

            // si no tiene productos, envía mensaje y no se ejecuta la compra
            if(cartFound.products.length < 1){
                res.send({message: 'Cart is empty'})
            }

            // generamos compra
            const newTicket = await purchaseService.generatePurchase(user, cid)

            // actualizamos productos que no tengan más stock
            const updatedProds = await cartService.updateProduct(cid, newTicket.noStock)
            console.log('updatedProds: ', updatedProds)

            // actualizamos stock de productos
            const updateStock = await ticketService.updateStockAfterPurchase(newTicket.prodStock)
            console.log('updateStock: ', updateStock)

            // guardamos el ticket con la info
            const newTkt = {
                id: newTicket.ticket._id,
                code: newTicket.ticket.code,
                date: newTicket.ticket.date,
                amount: newTicket.ticket.amount,
                purchaser: newTicket.ticket.purchaser
            } 
            console.log('newTkt controller: ', newTkt)

            // envio de mail por compra
            const email = {
                to: user,
                subject: 'Purchase',
                text: 'Gracias por su compra',
                html: `
                    <div class="container">
                        <h1> Resumen de compra </h1>
                            <div class="row">
                                <h4> Día: ${newTkt.date} </h4>    
                                <h3> Código: ${newTkt.code} </h3>
                                <h3> Total: ${newTkt.amount} </h3>
                            </div>
                    </div>
                `
            }
            console.log('email: ',email)
            const emailSent = await emailController.sendEmail(email)
            console.log('emailSent: ', emailSent)
            res.status(200).send({message: 'Purchased', ticket: newTkt })
        } catch (error) {
            res.status(500).send({error: error})
        }
    }

    getUserPurchases = async (req, res) => {
        try {
            const id = req.params.uid
            const userPurchases = await purchaseService.getUserPurchases(id)

            res.status(200).send({message: 'User Purchases: ', userPurchases})
        } catch (error) {
            res.status(500).send({error: error})
        }
    }

    deletePurchase = async (req, res) => {
        try {
            const deletePurchase = await purchaseService.deletePurchase()
            res.status(200).send(deletePurchase)
        } catch (error) {
            res.status(500).send({error: error})
        }
    }

}

export default PurchaseController