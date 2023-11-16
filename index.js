import express from "express";
const app=express();
import morgan from "morgan"
app.use(morgan("dev"));
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/dbConnection.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import expertRoute from "./routes/expert.js";


const PORT = process.env.PORT
console.log("PORT",PORT);
const FRONTENDURL = process.env.FRONTEND_URL

console.log(FRONTENDURL, "o");
//testing git log
const corsOptions = {
    origin: [FRONTENDURL]
};

app.use(cors(corsOptions));
app.use(express.json())

app.use('/user',userRoute)
app.use('/admin',adminRoute)
app.use('/expert',expertRoute)

connectDB()



app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})