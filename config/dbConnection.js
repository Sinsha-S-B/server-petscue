import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGOOSE = "mongodb://127.0.0.1:27017/Petscue";

 const connectDB = async () => {
    try {
        await mongoose.connect(MONGOOSE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected');
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
};
export default connectDB
