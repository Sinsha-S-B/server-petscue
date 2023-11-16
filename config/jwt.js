import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
// require ("dotenv").config()

export const  generateAccessToken = (id,name,role)=>{
    const expiresIn ="10m"
    const jwtAccessSecret  = "jwtAccessSecretname"
    const accessToken = jwt.sign({id,name,role},jwtAccessSecret,{expiresIn})
   
    return accessToken
}