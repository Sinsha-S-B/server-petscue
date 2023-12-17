import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
// require ("dotenv").config()

export const  generateAccessToken = (id,name,role)=>{
    const expiresIn ="10m"
    const jwtAccessSecret  = "jwtAccessSecretname"
    const accessToken = jwt.sign({id,name,role},jwtAccessSecret,{expiresIn})
    return accessToken
}

export const  generateRefreshToken = (id,name,role)=>{
    const expiresIn ="1d"
    const jwtAccessSecret  = "jwtAccessSecretname"
    const accessToken = jwt.sign({id,name,role},jwtAccessSecret,{expiresIn})
    return accessToken
}

export const  generateAccessTokenUseRefreshToken = (refreshToken)=>{
    const expiresIn ="10m"
    const jwtAccessSecret  = "jwtAccessSecretname"
    const {id,name,role} = jwt.verify(refreshToken, jwtAccessSecret);
    const accessToken = jwt.sign({id,name,role},jwtAccessSecret,{expiresIn});

   
    return accessToken
}
