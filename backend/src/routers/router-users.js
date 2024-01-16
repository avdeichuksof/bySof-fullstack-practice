import UsersController from '../controllers/controller-users.js'
const usersController = new UsersController()
import { Router } from 'express'
const router = new Router()

router.get('/current', usersController.getCurrentSessionInfo)

export default router