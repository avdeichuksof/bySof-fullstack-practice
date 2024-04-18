import { Router } from "express"
const router = new Router()
import PaymentController from "../controllers/controller-payments.js"
const paymentController = new PaymentController()

router.post('/payment-intents', paymentController.generatePaymentIntent)

export default router