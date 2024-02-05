import {Schema, model} from 'mongoose'
import { paginate } from 'mongoose-paginate-v2'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['famous', 'flowery', 'geometric', 'hobbies', 'tv', 'varios']
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})


/* ProductSchema.plugin(paginate)
 */

const Product = model('Product', ProductSchema)
export default Product