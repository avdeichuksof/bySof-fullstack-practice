import { Router } from 'express'
const router = new Router()
import EmailController from '../controllers/controller-emails.js'
const emailController = new EmailController()

router.post('/', emailController.sendEmailContact)

export default router