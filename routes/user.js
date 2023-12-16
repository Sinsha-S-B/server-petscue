// import express, { Router, text } from "express"/
import { Router } from "express";
const userRoute=Router()
import  {signup,login, createOtp, findOtp, storeImage,findEmail,resetpassword, FindById,googleLogin,editUser} from "../controller/userController/userController.js";
import {rescuerForm } from '../controller/userController/rescuerController.js'
import {fetchPet,fetchSinglePet,adoptSinglePet,filterPets} from '../controller/userController/adoptController.js'
import {fetchAllExperts} from '../controller/userController/trainingController.js'
import {verifyUserToken} from '../middleware/auth.js'

userRoute.post('/signup',signup)
userRoute.post('/login',login)
userRoute.post('/createOtp',createOtp)
userRoute.post('/getOtp',findOtp)
userRoute.post('/storeImage',storeImage)
userRoute.post("/UserProfile",FindById)
userRoute.patch("/editUser",editUser)
userRoute.post('/rescueForm',rescuerForm)
userRoute.post('/findemail',findEmail)
userRoute.post('/resetpassword',resetpassword)
userRoute.post('/fetchPetDetails',fetchPet)
userRoute.post('/singlePage',fetchSinglePet)
userRoute.post('/adoptsinglepet',adoptSinglePet)
userRoute.post('/filterPets',filterPets)

// userRoute.post('/searchPet',searchPet)
userRoute.post('/googleLogin',googleLogin)
userRoute.post('/training',fetchAllExperts)




export default userRoute