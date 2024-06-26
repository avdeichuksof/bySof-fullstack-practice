// dependencies
import cors from 'cors'
import passport from 'passport'
import bodyParser from 'body-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from './src/config/config.js'
import initPassport from './src/config/passport.js'


// server
import express from 'express'

const app = express()
const PORT = config.port

// http
import http from 'http'
const server = http.createServer(app)

// websocket
import { Server } from 'socket.io'
const io = new Server(server)

// CORS
app.use(cors({
    origin: 'http://localhost:3000', // permite solicitudes desde el frontend
    credentials: true // permite el envío de cookies de cross-origin
}))

// mongoDB
import connectDB from './src/dao/db/db.js'

// JSON settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())


// mongoStore
const expireTime = 1000 * 60 * 60 * 2 // dos horas en ms

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoURL
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: expireTime
    }
}))

// passport
initPassport()
app.use(passport.initialize())
app.use(passport.session())

// logger


// routers
import authRouter from './src/routers/router-auth.js'
app.use('/api/auth', authRouter)

import userRouter from './src/routers/router-users.js'
app.use('/api/users', userRouter)

import productRouter from './src/routers/router-products.js'
app.use('/api/products', productRouter)

import cartRouter from './src/routers/router-carts.js'
app.use('/api/carts', cartRouter)

import contactRouter from './src/routers/router-contact.js'
app.use('/contact', contactRouter)

// staticFiles
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// ruta estática para archivos de react
app.use(express.static(path.join(__dirname, '/public')))
const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(path.join(frontendBuildPath)))

// catch-all
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'))
})

// websocket config
import CartController from './src/controllers/controller-carts.js'
const cartController = new CartController()

io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('cartUpdated', async (data) => {
        const cartId = data.cartId
        const totalProducts = await cartController.getTotalProducts(cartId)

        io.emit('totalProds', {totalProducts: totalProducts})
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

})



// server listen
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    connectDB()
})

export default io