import { Router } from "express";
const expertRoute=Router()
import { expertSignup,login,createOtp,findOtp,ExpertFindById} from "../controller/expertController/expertController.js";
import { expertVideoUpload } from "../controller/expertController/expertVideoController.js";


expertRoute.post("/",login)
expertRoute.post("/verify",expertSignup)
expertRoute.post('/createOtp',createOtp)
expertRoute.post('/getOtp',findOtp)
expertRoute.post('/profile/:id',ExpertFindById)
expertRoute.post('/videoupload',expertVideoUpload)

export default expertRoute