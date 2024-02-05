import UsersController from '../controllers/controller-users.js'
const usersController = new UsersController()
import { Router } from 'express'
const router = new Router()
import {isAdmin, isUser} from  '../utils/middlewares.js'

router.get('/', usersController.getUsers)

router.delete('/', isAdmin, usersController.deleteInactiveUsers)
router.delete('/delete/:uid', isAdmin, usersController.deleteUser)


export default router