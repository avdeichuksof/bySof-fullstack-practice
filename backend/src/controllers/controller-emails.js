import User from '../dao/models/model-user.js'
import config from '../config/config.js'
import nodemailer from 'nodemailer'
import uuid4 from 'uuid4'
import fs from 'fs'


const mailAccount = config.mailAccount
const mailPass = config.mailPass

let secrets = []

class EmailController {
    sendEmail = async (data) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: mailAccount,
                    pass: mailPass
                }
            })

            const mailOptions = {
                from: 'By Sof' + mailAccount,
                to: data.to,
                subject: data.subject,
                text: data.text,
                html: data.html
            }

            let message = transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.log(err)

                console.log(`Email sent to: ${mailOptions.to}`)
            })

        } catch (err) {
            console.log('Error sending mail', err)
        }
    }

    /* PASSWORD RECOVERY MAILS */
    mailTimeout = (secret) => {
        secrets.push(secret)
        setTimeout(() => {
            secrets = secrets.filter(s => s != secret)
        }, 3600000)
    }

    sendRecoveryMail = async (req, res) => {
        try {
            const userEmail = req.body.email
            /* const userExists = await userService.getUsersByEmailService(userEmail) */
            const userExists = await User.find({ email: userEmail })

            const secret = uuid4()
            this.mailTimeout(secret)

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: mailAccount,
                    pass: mailPass
                }
            })

            const mailOptions = {
                from: 'BySof' + mailAccount,
                to: userEmail,
                subject: 'Restore password',
                text: 'Se ha solicitado un cambio de contraseña',
                html: `
                    <div class="container"> 
                        <h2> Restauración de contraseña </h2>
                        <p> Ingrese al siguiente link para cambiar su contraseña: </p>
                        <p> Pasada una hora, el link expirará y se deberá solicitar nuevamente </p>
                
                        <a href="http://localhost:8080/restorepassword?secret=${secret}&email=${userEmail}"> Cambiar contraseña </a>
    
                        <h6> Si usted no solicitó un cambio de contraseña ignore este mail </h6>
                    </div>
                `,
                attachments: []
            }

            if (userExists) {
                let message = transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.log(err)
                    console.log('Message sent: %s', info.messageId)
                })
            } else {
                console.log('El usuario ingresado no existe')
            }
        } catch (err) {
            throw new Error('Error sending mail ' + err)
        }
    }

    sendEmailContact = async (req, res) => {
        const { fullName, email, subject, message, file } = req.body

        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ message: 'Por favor, complete todods los campos obligatorios' })
        }

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: mailAccount,
                    pass: mailPass
                }
            })

            let attachments = []
            if (file) {
                // Lee el contenido del archivo adjunto
                const fileContent = fs.readFileSync(file.path)
                attachments.push({
                    filename: file.name,
                    content: fileContent
                })
            }

            const mailOptions = {
                from: `${fullName} <${email}>`,
                to: mailAccount,
                subject: subject,
                text: message,
                attachments:attachments
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Error sending email:', err)
                    return res.status(500).json({ message: 'Hubo un problema al enviar el correo electrónico.' })
                }
                console.log(`Email sent to: ${mailOptions.to}`)
                return res.status(200).json({ message: 'Correo electrónico enviado correctamente.' })
            })

        } catch (err) {
            console.log('Error sending mail', err)
            return res.status(500).json({ message: 'Hubo un problema al enviar el correo electrónico.' })
        }
    }

}

export default EmailController