import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
// require ("dotenv").config()

export const  generateAccessToken = (id,name,role)=>{
    const expiresIn ="10m"
    const jwtAccessSecret  = "jwtAccessSecretname"
    const accessToken = jwt.sign({id,name,role},jwtAccessSecret,{expiresIn})
   
    return accessToken
   
    }

export const verifyUserToken=async(req,res,next)=>{
        try{
            let token = req.headers.authorization
            if(!token){
                console.log('token illa ughh')
                return res.status(403).json({errmsg:'Access denied'})
            }
    
            if(token.startsWith('Bearer')){
               console.log('token ind guys')
               token = token.slice(7,token.length).trimLeft()
            }
    
            const verified = jwt.verify(token,SECRETCODE)
            if(verified.role === 'user'){
    
                const user = await userModel.findOne({_id:verified.id});
                if(user.isBlocked){
                    return res.status(403).json({errmsg:'user is blocked by admin'})
                }else{
                    req.payload = verified
                    next()
                }
                }else{
                    req.status(403).json({errmsg:'Access is denied'})
                }
            }catch (error){
               res.status(500).json({errmsg:'server error'})
            }
        }
    
 export const  verifyAdminToken= async(req,res,next) => {
          try{
             let token = req.headers.authorization
             if(!token){
                return res.status(403).json({errmsg:'Access Denied'})
             }
             
            if(token.startsWith('Bearer')){
                token = token.slice(7,token.length).trimLeft()
             }
    
             const verified = jwt.verify(token , SECRETCODE)
    
             if(verified.role === 'admin'){
                req.payload = verified
                next()
             }else{
                return res.status(403).json({errmsg:'Access is denied'})
             }
          }catch(err){
            console.log(err.message);
            return res.status(500).json({errmsg:'Server error'})
          }
        }
    
        export const  verifyExprtToken= async(req,res,next) => {
            try{
               let token = req.headers.authorization
               if(!token){
                  return res.status(403).json({errmsg:'Access Denied'})
               }
               
              if(token.startsWith('Bearer')){
                  token = token.slice(7,token.length).trimLeft()
               }
      
               const verified = jwt.verify(token , SECRETCODE)
      
               if(verified.role === 'expert'){
                  req.payload = verified
                  next()
               }else{
                  return res.status(403).json({errmsg:'Access is denied'})
               }
            }catch(err){
              console.log(err.message);
              return res.status(500).json({errmsg:'Server error'})
            }
          }
