import mongoose from "mongoose"
import config from "../../config/config.js"
const URL = config.mongoURL

const connectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to DB: ', error)
    }
}

export default connectDB