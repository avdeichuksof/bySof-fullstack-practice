import PaymentService from "../services/service-payments.js"
const service = new PaymentService()
import Product from "../dao/models/model-product.js"

class PaymentController {

    generatePaymentIntent = async (req, res) => {
        const pid = req.query.id
        console.log(`Intentando realizar un pago con product id: ${pid}`)

        try {
            // buscamos el producto que se quiere comprar
            const requestedProduct = await Product.find(prod => prod._id === parseInt(pid))
            if(!requestedProduct) return res.status(404).send({status: 'error', error: 'Product not found'})

            // creamos un objeto de pago
            const paymentIntentInfo = {
                amount: requestedProduct.price,
                currency: 'ars'
            }

            // creamos un servicio para el pago
            const result = await service.createPaymentIntent(paymentIntentInfo)
            console.log('Resultado de un intento de pago: ')
            console.log(result)

            res.status(200).send({status: 'success', payload: result})
        } catch (error) {
            console.error(error)
            res.status(500).send({status: 'error', error: error})
        }
    }

}

export default PaymentController