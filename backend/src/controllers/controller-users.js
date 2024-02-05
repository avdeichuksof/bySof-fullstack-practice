import User from "../dao/models/model-user.js"
import UserService from "../services/service-users.js"
const userService = new UserService()
import EmailController from './controller-emails.js'
const emailController = new EmailController()
import CartService from '../services/service-carts.js'
const cartService = new CartService()
import UserDTO from '../dao/DTO/dto-user.js'
import jwt from 'jsonwebtoken'

class UsersController {
    getUsers = async (req, res) => {
        try {
            const users = await userService.getUsers()
            res.status(200).send({ users: users })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    getUsersById = async (req, res) => {
        try {
            const uid = req.params.uid
            const userFound = await userService.getUserById(uid)

            res.status(200).send({ user: userFound })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    changePassword = async (req, res) => {
        try {
            const newPassword = await userService.changePassword(req.body.email, req.body.password)
            res.status(200).json({ message: 'Password changed successfully', password: newPassword })
        } catch (error) {
            // Log the error
            console.error('Error changing password:', error)

            // Send error response
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const uid = req.params.uid
            const deleteUser = await userService.deleteUser(uid)

            res.status(200).send({ message: 'User deleted', user: deleteUser })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    deleteInactiveUsers = async (req, res) => {
        try {
            // guardamos el date actual y le restamos 30 para settear el tiempo de inactividad
            const date = new Date()
            date.setDate(date.getDate() - 30)

            // buscamos los usuarios inactivos
            const inactiveUsers = await User.find({ lastConnection: { $lt: date }, role: { $ne: 'admin' } })

            // si hay, les enviamos un mail de aviso
            if (inactiveUsers) {
                await userService.deleteInactiveUsers(date)

                inactiveUsers.forEach(async (user) => {
                    // se borra el carrito del usuario eliminado
                    await cartService.deleteCart(user.cart)

                    // email
                    const email = {
                        to: user.email,
                        subject: 'Cuenta eliminada',
                        text: 'Le informamos que su cuenta ha sido eliminada debido a inactividad mayor a 30 días.',
                        html: `
                                <div class="container"> 
                                    <h2> Datos de la cuenta eliminada </h2>
                                    <p><b>Usuario:</b>${user.firstName}</p>
                                    <p><b>Email:</b>${user.email}</p>
                                    <p><b>Última conexión:</b>${user.lastConnection}</p>
                                    
                                    <h5> Si cree que se trata de un error, comuníquese con nosotros. </h5>
                                </div>
                            `
                    }

                    await emailController.sendEmail(email)

                    res.status(200).send({ message: 'Inactive users deleted' })
                })
            }
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    /* USERS SESSION MANAGEMENT */

    userRegister = (req, res) => {
        try {
            if (!req.user) return res.status(400).send({ error: 'There was an error registering.' })

            req.session.user = {
                _id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                password: req.user.password,
                age: req.user.age,
                role: req.user.role,
                cart: req.user.cart
            }

            res.status(200).redirect('/api/auth/login')
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }

    redirectFailedRegister = (req, res) => {
        res.status(400).send({ error: 'Failed to register' })
    }

    userLogin = (req, res) => {
        try {
            if (!req.user) res.status(401).send({ error: 'Invalid credentials' })

            req.logIn(req.user, (err) => {
                if (err) {
                    console.error('Error logging in: ', err)
                    return res.status(500).send({ error: 'Internal server error' })
                }
            })

            req.session.user = {
                _id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                age: req.user.age,
                role: req.user.role,
                cart: req.user.cart,
                lastConnection: req.user.lastConnection
            }

            const showUserData = new UserDTO(req.session.user)
            console.log({ loggedIn: showUserData })

            // si se loggea creamos un token
            try {
                let token = jwt.sign(req.session.user, 'secret', { expiresIn: '2000s' })
                console.log('User logged in')

                res.status(200).json({ token: token, user: showUserData })
            } catch (error) {
                return res.status(500).send({ error: 'Error creating token', detail: error })
            }
        } catch (error) {
            console.error('Error logging in: ', error)
            res.status(500).send({ error: error })
        }
    }

    redirectFailedLogin = (req, res) => {
        res.status(400).send({ error: 'Failed to login' })
    }

    userLogout = async (req, res) => {
        const userId = req.session.user._id
        // si encontramos el user id 
        if (userId) {
            // cerramos la session y updateamos lastConnection
            await userService.getLastConnection(userId, false)
                .then((lastConnection) => {
                    ñ
                    req.session.destroy((error) => {
                        if (err) res.status(500).send({ error: 'Logout failed', detail: error })
                        console.log('Logged out')
                        res.redirect('/api/auth/login')
                    })
                })
        } else {
            res.status(401).send('Error logging out')
        }
    }

    getCurrentSessionInfo = (req, res) => {
        const user = req.session.user
        const showUserData = new UserDTO(user)

        res.status(200).send({ currentUser: showUserData })
    }

}



export default UsersController