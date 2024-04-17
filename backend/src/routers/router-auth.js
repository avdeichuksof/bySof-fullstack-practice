import passport from 'passport'
import {Router} from 'express'
import {isUser, isAdmin} from '../utils/middlewares.js'
import UsersController from '../controllers/controller-users.js'
const usersController = new UsersController()
import EmailController from '../controllers/controller-emails.js'
const emailController = new EmailController()

const router = new Router()

router.get('/currentuser', usersController.getCurrentSessionInfo)

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

router.post('/sendrecoverymail', emailController.sendRecoveryMail)
router.post('/restorepassword', usersController.restorePassword)

export default router