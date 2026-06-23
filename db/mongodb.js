import {DATABASE_URL, NODE_ENV} from "../config/env.js";
import mongoose from "mongoose";

if (!DATABASE_URL){
    throw new Error("DATABASE_URL must be set before loading configuration");
}

const connectToDB = async () => {
    try {
    await mongoose.connect(DATABASE_URL)
    console.log(`Connected to DB in ${NODE_ENV} mode`)

    } catch (e) {
    console.error('Failed to connect to DB :' , e)
        process.exit(1)
    }
}


export default connectToDB

