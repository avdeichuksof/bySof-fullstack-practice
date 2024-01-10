// dependencies
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from './src/config/config.js'


// server
import express from 'express'
const app = express()

import http from 'http'
const server = http.createServer(app)

const PORT = config.port

// mongo
import connectDB from './src/dao/db/db.js'

// JSON settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

import path from 'path'
import __dirname from './src/utils/utils.js'
app.use(express.static(path.join(__dirname + '/public')))

// mongoStore
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoURL
    }),
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}))


// passport


// logger


// routers
import homeRouter from './src/routers/home-router.js'
import productsRouter from './src/routers/products-router.js'

app.use('/', homeRouter)
app.use('/api/products', productsRouter)


// server listen
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    connectDB()
})