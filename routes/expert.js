import { Router } from "express";
const expertRoute=Router()
import { expertSignup,login,createOtp,findOtp} from "../controller/expertController/expertController.js";

expertRoute.post("/",login)
expertRoute.post("/verify",expertSignup)
expertRoute.post('/createOtp',createOtp)
expertRoute.post('/getOtp',findOtp)


export default expertRoute