import passport from 'passport'
import {Router} from 'express'
import {isUser, isAdmin} from '../utils/middlewares.js'
import UsersController from '../controllers/controller-users.js'
const usersController = new UsersController()

const router = new Router()

router.post('/register', passport.authenticate('register', 
    { failureRedirect: '/auth/failedregistration' }), 
    usersController.userRegister
)
router.get('/failedregistration', usersController.redirectFailedRegister)

router.post('/login', passport.authenticate('login', 
    { failureRedirect: '/auth/failedlogin' }),
    usersController.userLogin
)
router.get('/failedlogin', usersController.redirectFailedLogin)

router.get('/logout', usersController.userLogout)
router.get('/currentuser', isUser, usersController.getCurrentSessionInfo)

export default router