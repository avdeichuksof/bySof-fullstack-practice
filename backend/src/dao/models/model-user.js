import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    lastConnection: {
        type: String
    },
    // si es admin va a poder subir documentos, clientes VIP recibiran ofertas exclusivas 
    /* documents: [{
        name: {
            type: String
        },
        reference: {
            type: String
        }
    }] */
})

const User = model('User', UserSchema)
export default User