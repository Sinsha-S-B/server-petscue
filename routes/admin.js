import express, { Router, text } from "express"

const adminRoute=express.Router()
import { adminLogin ,fetchAllUsers,userStatus} from "../controller/adminController/adminController.js"

adminRoute.post('/login',adminLogin)
adminRoute.post('/userdetails',fetchAllUsers)
adminRoute.patch('/userstatus',userStatus)

export default adminRoute