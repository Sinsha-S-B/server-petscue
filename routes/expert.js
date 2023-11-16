import { Router } from "express";
const expertRoute=Router()
import { expertSignup,login} from "../controller/expertController/expertController.js";

expertRoute.post("/",login)
expertRoute.post("/signup",expertSignup)


export default expertRoute