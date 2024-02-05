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
import history from 'connect-history-api-fallback'

const app = express()
const PORT = config.port

// http
import http from 'http'
const server = http.createServer(app)

// CORS
app.use(cors())

// mongoDB
import connectDB from './src/dao/db/db.js'

// JSON settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())


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
initPassport()
app.use(passport.initialize())
app.use(passport.session())

// logger


// routers
import authRouter from './src/routers/router-auth.js'
app.use('/api/auth', authRouter)

import userRouter from './src/routers/router-users.js'
app.use('/api/users', userRouter)

import cartRouter from './src/routers/router-carts.js'
app.use('/api/carts', cartRouter)

// staticFiles
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// history API fallback
// app.use(history())


// ruta estática para archivos de react
app.use(express.static(path.join(__dirname , '/public')))
const frontendBuildPath = path.join(__dirname, '..' ,'frontend', 'dist')
app.use(express.static(path.join(frontendBuildPath)))

// catch-all
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'))
})



// server listen
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    connectDB()
})