import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL

function connect_db() {
    mongoose.connect(MONGO_URL).then(() => {
        console.log("MongoDB connected")
    }).catch((err) => {
        console.error('MongoDB connection error:', err)
    })
}

export default connect_db