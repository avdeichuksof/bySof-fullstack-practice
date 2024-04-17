import { createHash, isValidPassword } from '../utils/bcrypt.js'
import UserMethods from '../dao/methods/methods-users.js'
import User from '../dao/models/model-user.js'
const userMethods = new UserMethods()
import CartService from './service-carts.js'
const cartService = new CartService()

class UserService {

    getUsers = async () => {
        try {
            const users = await userMethods.getUsers()
            return users
        } catch (error) {
            throw new Error(err.message)
        }
    }

    getUserById = async (id) => {
        try {
            const userFound = await userMethods.getUserById(id)
            return userFound
        } catch (error) {
            throw new Error(err.message)
        }
    }

    getLastConnection = async (id, isLogged) => {
        try {
            // generamos la última conexión
            const lastConnection = new Date().toLocaleString()

            // buscamos el usuario
            const userFound = await this.getUserById(id)

            // si existe y está loggeado, guardamos la últ conexión
            if (userFound && isLogged) {
                await userMethods.editUser(id, { lastConnection: lastConnection })
                return lastConnection
            } else {
                return false
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    createUser = async (user) => {
        try {
            // validamos los campos requeridos
            if (!user.firstName || !user.lastName || !user.email || !user.password || !user.age) {
                throw new Error('All fields are required')
            }
            // creamos el usuario
            const newUser = await userMethods.createUser(user)
            return newUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    editUser = async (id, newData) => {
        try {
            // buscamos el usuario por id
            const userFound = await this.getUserById(id)
            if (!userFound) throw new Error('User not found')

            // Iteramos sobre los nuevos datos
            for (const key in newData) {
                // Verificamos si el valor no está vacío o nulo
                if (newData[key] !== null && newData[key] !== '') {
                    // Actualizamos el campo correspondiente 
                    userFound[key] = newData[key]
                }
            }

            // guardamos los cambios
            const updateUser = await userMethods.editUser(userFound._id, userFound)

            if (!updateUser) throw new Error('There was an error updating user data')

            return updateUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    restorePassword = async (userEmail, newPassword) => {
        try {
            // buscamos el usuario por email
            const userFound = await User.findOne({ email: userEmail })

            // verificamos que la contraseña no sea igual a la anterior
            if (isValidPassword(newPassword, userFound.password)) {
                throw new Error('You cannot reuse your previous password')
            } else {
                // actualizamos a la nueva contraseña y la hasheamos
                const updatePassword = await userMethods.editUser(userFound._id, { password: createHash(newPassword) })

                if (!updatePassword) throw new Error('There was an error updating your password')
                return { data: updatePassword }
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    changePassword = async (userId, currentPass, newPass) => {
        try {
            // buscamos usuario por ID
            const userFound = await this.getUserById(userId)
            console.log('userFound service: ', userFound)

            if (!userFound) throw new Error('User not found')

            // si se encontró el usuario verificamos que la contraseña actual sea correcta
            if (isValidPassword(currentPass, userFound.password)) {
                // ahora validamos que la nueva contraseña no sea igual a la anterior
                if (isValidPassword(newPass, userFound.password)) throw new Error('You cannot reuse your previous password')

                // updateamos la contraseña y hasheamos
                const updatePassword = await userMethods.editUser(userFound._id, { password: createHash(newPass) })
                console.log('updatePassword service: ', updatePassword)

                if (!updatePassword) throw new Error('There was an error updating your password')

                return { data: updatePassword }
            } else {
                throw new Error('The current password is incorrect')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }


    deleteUser = async (id) => {
        try {
            const deleteUser = await userMethods.deleteUser(id)
            return deleteUser
        } catch (error) {
            throw new Error(err.message)
        }
    }

    deleteInactiveUsers = async (date) => {
        try {
            // buscamos los usuarios inactivos desde cierta fecha y los eliminamos
            const inactiveUsers = await User.deleteMany({
                lastConnection: { $lt: date },
                role: { $ne: 'admin' }
            })
            return inactiveUsers
        } catch (error) {
            throw new Error(err.message)
        }
    }

}

export default UserService