import {Schema, model} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true
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
        enum: ['arcilla', 'cajitas', 'cuadros', 'personalizados']
    },
    subcategory: {
        type: String,
        required: true,
        enum: ['famous', 'flowery', 'geometric', 'hobbies', 'tv', 'varios']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})


ProductSchema.plugin(mongoosePaginate)


const Product = model('Product', ProductSchema)
export default Product