import dotenv from 'dotenv'
import fetch from 'node-fetch'
import passport from 'passport'
import local from 'passport-local'

import config from './config.js'
import User from '../dao/models/model-user.js'
import Cart from '../dao/models/model-cart.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import UserService from '../services/service-users.js'
const userService = new UserService()

dotenv.config()
const LocalStrategy = local.Strategy

const initPassport = async () => {
    passport.use('register',
        new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email'
        },

            async (req, username, password, done) => {
                try {
                    const userData = req.body

                    // buscamos si ya existe el usuario
                    const userFound = await User.findOne({ email: username })
                    if (userFound) {
                        console.log('User already exists')
                        return done(null, false)
                    }

                    // setteamos el rol
                    const role = (userData.email === config.adminEmail && userData.password === config.adminPass) ? 'admin' : 'user'

                    // creamos carrito del usuaril
                    const cart = new Cart()

                    // creamos usuario
                    const newUser = {
                        email: username,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        password: createHash(userData.password),
                        cart: await cart.save(),
                        age: userData.age,
                        role: role
                    }

                    // guardamos el nuevo usuario
                    const userCreated = await userService.createUser(newUser)
                    console.log('User registered')
                    done(null, userCreated)
                } catch (error) {
                    return done('Error registering user' + err)
                }
            }
        )
    )

    passport.use('login', 
        new LocalStrategy({usernameField: 'email'},
        
            async(username, password, done) => {
                try {
                    // buscamos el usuario
                    const userExists = await User.findOne({email: username})

                    // si no existe
                    if(!userExists) {
                        console.log('User not found')
                        return done(null, false)
                    }
                    // validamos password
                    if(!isValidPassword(password, userExists.password)){
                        console.log('Incorrect password')
                        return done(null, false)
                    }

                    // validamos admin
                    if(userExists.email === config.adminEmail && userExists.password === config.adminPass){
                        req.session.admin = true
                    }

                    userExists.lastConnection = await userService.getLastConnection(userExists.id, true)

                    // si funciona todo
                    return done(null, userExists)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // se activa cuando se crea el user y lo serializa
    passport.serializeUser((user, done) => {
        done(null, user._id)
    }),

    // deserializa cuando querramos loguear y da paso a la estrategia de login
    passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id)
        done(null, user)
    })
}

export default initPassport