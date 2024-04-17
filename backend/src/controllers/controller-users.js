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
            const id = req.params.uid
            const userFound = await userService.getUserById(id)

            res.status(200).send({ user: userFound })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    editUser = async (req, res) => {
        try {
            const id = req.params.uid
            const newData = req.body

            const updateUser = await userService.editUser(id, newData)
            
            res.status(201).send(updateUser)
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    restorePassword = async (req, res) => {
        try {
            const newPassword = await userService.restorePassword(req.body.email, req.body.password)
            res.status(201).json({ message: 'Password restored successfully', password: newPassword })
        } catch (error) {
            console.error('Error changing password:', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    changePassword = async (req, res) => {
        try {
            const userId = req.params.uid
            console.log('userId controller: ', userId)
            const userFound = await userService.getUserById(userId)
            if(!userFound) console.error('User not found')
            /* console.log('userFound controller: ', userFound) */

            const currentPass = req.body.password
            const newPass = req.body.newPassword

            const newPassword = await userService.changePassword(userId, currentPass, newPass)

            console.log('newPassword controller: ', newPassword)
/* 
            // datos para enviar el email
            const data = {
                id: userId,
                email: userFound.email
            }
            console.log('data controller: ', data)

            await emailController.passwordChanged(data) */

            res.status(201).send(newPassword)

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const uid = req.params.uid
            // buscamos el user por el uid 
            const getDeletedUser = await  userService.getUserById(uid)
            
            // si existe, borramos el carrito
            if(getDeletedUser) await cartService.deleteCart(getDeletedUser.cart)

            // borramos el usuario
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

    /* ------------ USERS SESSION MANAGEMENT ------------ */

    userRegister = (req, res) => {
        try {
            // validamos que haya un req.user
            if (!req.user) return res.status(400).send({ error: 'There was an error registering.' })

            // guardamos los datos del req.user 
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

            // redirigimos a login
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
            // validamos la sesión
            if (!req.user) res.status(401).json({ error: 'Invalid credentials' })

            req.logIn(req.user, (err) => {
                if (err) {
                    console.error('Error logging in: ', err)
                    return res.status(500).send({ error: 'Internal server error' })
                }
            })

            // guardamos los datos del req.user y setteamos lastConnection
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

            // pasamos los datos a DTO para no mostrar info sensible
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

                    req.session.destroy((error) => {
                        if (error) res.status(500).send({ error: 'Logout failed', detail: error })
                        console.log('Logged out')
                        res.redirect('/api/auth/login')
                    })
                })
        } else {
            res.status(401).send('Error logging out')
        }
    }

    getCurrentSessionInfo = (req, res) => {
        try {
            // buscamos el req.session.user
            const user = req.session.user

            // si no existe retorna error
            if(!user) return res.status(404).send({error: 'User session not found'})

            // si existe, pasamos los datos por DTO para no mostrar info sensible
            const showUserData = new UserDTO(user)

            res.status(200).send({ currentUser: showUserData })
        } catch (error) {
            console.error('Error catching current user data:', error)
            res.status(500).send({error: 'Internal server error'})
        }
    }

}



export default UsersController