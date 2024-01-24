import {createHash, isValidPassword} from '../utils/bcrypt.js'
import UserMethods from '../dao/methods/methods-users.js'
import User from '../dao/models/model-user.js'
const userMethods = new UserMethods()


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
            const lastConnection = new Date().getDate().toString()

            const userFound = await this.getUserById(id)

            if (userFound && isLogged) {
                await userMethods.updateUser(id, { lastConnection: lastConnection })
                return lastConnection
            } else {
                return false
            }
        } catch (error) {
            throw new Error(err.message)
        }
    }

    createUser = async (user) => {
        try {
            if (!user.firstName || !user.lastName || !user.email || !user.password || !user.age) {
                throw new Error('All fields are required')
            }

            const newUser = await userMethods.createUser(user)
            return newUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    changePassword = async (userEmail, newPassword) => {
        const userFound = await User.findOne({email: userEmail})

        if(isValidPassword(newPassword, userFound.password)){
            throw new Error('You cannot reuse your previous password')
        }else{
            const updatePassword = await userMethods.updateUser(userFound._id, {password: createHash(newPassword)})

            if(updatePassword){
                return {message: 'Password updated successfully'}
            }else{
                throw new Error('There was an error updating your password')
            }
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
            const inactiveUsers = await User.deleteMany({lastConnection: {$lt: date},
                role: {$ne: 'admin'}})
                return inactiveUsers
        } catch (error) {
            throw new Error(err.message)
        }
    }

}

export default UserService