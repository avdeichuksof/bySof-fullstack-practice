import UsersController from '../controllers/controller-users.js'
const usersController = new UsersController()
import PurhcaseController from '../controllers/controller-purchases.js'
const purchaseController = new PurhcaseController()
import { Router } from 'express'
const router = new Router()
import {isAdmin} from  '../utils/middlewares.js'

router.get('/', usersController.getUsers)
router.get('/:uid', usersController.getUsersById)
router.get('/:uid/purchases', purchaseController.getUserPurchases)

router.put('/edit/:uid', usersController.editUser)
router.put('/edit/:uid/password', usersController.changePassword)

router.delete('/inactive', isAdmin, usersController.deleteInactiveUsers)
router.delete('/:uid', usersController.deleteUser)


export default router