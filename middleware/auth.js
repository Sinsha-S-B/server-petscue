import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
// require ("dotenv").config()

export const  generateAccessToken = (id,name,role)=>{
   console.log('iiiiiiiiiiii');
    const expiresIn ="10m"
    const jwtAccessSecret  = "jwtAccessSecretname"
    const accessToken = jwt.sign({id,name,role},jwtAccessSecret,{expiresIn})
   
    return accessToken
   
    }

    export const verifyUserToken = async (req, res, next) => {
      try {

         const jwtAccessSecret  = "jwtAccessSecretname"
        let token = req.headers.authorization;
    
        if (!token) {
          console.log('Token is missing');
          return res.status(403).json({ errmsg: 'Access denied' });
        }
    
        if (token.startsWith('Bearer')) {
          console.log('Token found');
          token = token.slice(7, token.length).trimLeft();
        }
    
        // Verify the token without ignoring expiration
        const decodedToken = jwt.verify(token, jwtAccessSecret);
    
        // Check if the token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimestamp) {
          return res.status(401).json({ errmsg: 'Token has expired' });
        }
    
        if (decodedToken.role === 'user') {
          const user = await userModel.findOne({ _id: decodedToken.id });
    
          if (user.isBlocked) {
            return res.status(403).json({ errmsg: 'User is blocked by admin' });
          } else {
            req.payload = decodedToken;
            next();
          }
        } else {
          res.status(403).json({ errmsg: 'Access is denied' });
        }
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ errmsg: 'Token has expired' });
        }
        res.status(500).json({ errmsg: 'Server error' });
      }
    };
    
 export const  verifyAdminToken= async(req,res,next) => {
          try{
             let token = req.headers.authorization
             if(!token){
                return res.status(403).json({errmsg:'Access Denied'})
             }
             
            if(token.startsWith('Bearer')){
                token = token.slice(7,token.length).trimLeft()
             }
    
             const verified = jwt.verify(token , jwtAccessSecret)
    
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
      
               const verified = jwt.verify(token , jwtAccessSecret)
      
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
