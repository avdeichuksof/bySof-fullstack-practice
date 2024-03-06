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

            const cartFound = await cartService.getCartById(cid)

            if(cartFound.products.length < 1){
                res.send({message: 'Cart is empty'})
            }

            const newTicket = await purchaseService.generatePurchase(user, cid)
            // actualizamos productos que no tengan más stock
            await cartService.updateProduct(cid, newTicket.noStock)
            // actualizamos stock de productos
            await ticketService.updateStockAfterPurchase(newTicket.prodStock)

            // guardamos el ticket con la info
            const newTkt = {
                id: newTicket.ticket._id,
                amount: newTicket.ticket.amount,
                purchaser: newTicket.ticket.purchaser
            } 

            // envio de mail por compra
            const email = {
                to: user,
                subject: 'Purchase',
                text: 'Gracias por su compra',
                html: `
                    <div class="container">
                        <h1> Resumen de compra </h1>
                            <div class="row">
                                <h4> Día: ${newTicket.ticket.purchase_datetime} </h4>    
                                <h3> Código: ${newTicket.ticket.code} </h3>
                                <h3> Total: ${newTicket.ticket.amount} </h3>
                            </div>
                    </div>
                `
            }

            await emailController.sendEmail(email)
            
            res.status(200).send({message: 'Purchased', newTkt})
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