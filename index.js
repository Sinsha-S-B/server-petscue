import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import expertRoute from "./routes/expert.js";

const app = express();
app.use(morgan("dev"));

dotenv.config();
const PORT = process.env.PORT;
const FRONTENDURL = process.env.FRONTEND_URL;

const corsOptions = {
  origin: [FRONTENDURL],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/expert", expertRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
