import express, { Router, text } from "express"

const adminRoute=express.Router()
import { adminLogin ,fetchAllUsers,userStatus,fetchAllExperts,expertStatus} from "../controller/adminController/adminController.js"

adminRoute.post('/login',adminLogin)
adminRoute.post('/userdetails',fetchAllUsers)
adminRoute.patch('/userstatus',userStatus)
adminRoute.post('/expertdetails',fetchAllExperts)
adminRoute.patch('/expertstatus',expertStatus)


export default adminRoute