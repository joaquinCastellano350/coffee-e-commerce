import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
    try {
        if(!MONGO_URI) throw new Error ('The database URI was not found.')
        await mongoose.connect(MONGO_URI)
        console.log("Successfully connected to the database.")
        }
    catch(error){
        console.error("Error connecting to the database: ", error)
        process.exit(1);
    }
}