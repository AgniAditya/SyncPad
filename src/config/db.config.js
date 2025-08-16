import mongoose from "mongoose"
import {DB_NAME , MONGODB_URI} from './env.config.js'

const ConnectDB = async () => {
    try {
        const connectionResponse = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected !! DB Host : ${connectionResponse.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED:",error);
        process.exit(1)
    }
}

export {
    ConnectDB
}