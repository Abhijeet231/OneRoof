import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}?retryWrites=true&w=majority&appName=OneRoof`
        )
    }catch(err){
        console.log('MONGODB CONNECTION ERROR:', err);
        process.exit(1);
    }
};

export default connectDB ;


