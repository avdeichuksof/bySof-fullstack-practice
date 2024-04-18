import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
    .option('-d', 'Debug variable', false)
    .option('-p <port>', 'Server port', 8080)
    .option('--mode <mode>', 'Work mode', 'develop')
program.parse()

console.log('Mode options: ', program.opts().mode)

const environment = program.opts().mode

dotenv.config({
    path: environment === 'production' ? './.env' : './.env'
})

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    secret: process.env.SECRET,
    mailAccount: process.env.GMAIL_ACCOUNT,
    mailPass: process.env.GMAIL_APP_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
}