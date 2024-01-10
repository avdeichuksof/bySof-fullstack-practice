import User from "../models/model-user.js"

class UserMethods {

    getUsers = async () => {
        const users = await User.find().lean()
        return users
    }

    getUserById = async (id) => {
        const userFound = await User.findOne({ _id: id })
        return userFound
    }

    createUser = async (user) => {
        const newUser = await User.create(user)
        return newUser
    }

    updateUser = async (id, newData) => {
        const updateUser = await User.updateOne({ _id: id }, { $set: newData })
        return updateUser
    }

    deleteUser = async (id) => {
        const deleteUser = await User.deleteOne({ _id: id })
        return deleteUser
    }

}

export default UserMethods