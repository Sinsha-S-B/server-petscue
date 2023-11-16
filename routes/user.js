// import express, { Router, text } from "express"/
import { Router } from "express";
const userRoute=Router()
import  {signup,login, createOtp, findOtp, storeImage,findEmail,resetpassword, FindById} from "../controller/userController/userController.js";
import {rescuerForm ,fetchPet,fetchSinglePet} from '../controller/userController/rescuerController.js'
import {verifyUserToken} from '../middleware/auth.js'

userRoute.post('/signup',signup)
userRoute.post('/login',login)
userRoute.post('/createOtp',createOtp)
userRoute.post('/getOtp',findOtp)
userRoute.post('/storeImage',storeImage)
userRoute.post("/UserProfile",FindById)
userRoute.post('/rescueForm',rescuerForm)
userRoute.post('/findemail',findEmail)
userRoute.post('/resetpassword',resetpassword)
userRoute.post('/fetchPetDetails',fetchPet)
userRoute.post('/singlePage',fetchSinglePet)


export default userRoute