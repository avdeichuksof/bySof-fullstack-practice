import Ticket from '../models/model-ticket.js'

class TicketMethods {

    getTickets = async () => {
        const tickets = await Ticket.find({})
        return tickets
    }

    createTicket = async (ticket) => {
        const newTicket = await Ticket.create(ticket)
        return newTicket
    }

    deletePurchase = async (id) => {
        const ticket = await Ticket.deleteOne({_id: id})
        return ticket
    }

}

export default TicketMethods