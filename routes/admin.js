import express, { Router, text } from "express"

const adminRoute=express.Router()
import { adminLogin } from "../controller/adminController/adminController.js"

adminRoute.post('/login',adminLogin)

export default adminRoute