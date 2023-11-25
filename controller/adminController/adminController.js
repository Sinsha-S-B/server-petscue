import adminModel from "../../model/adminModel.js"
import { generateAccessToken } from "../../config/jwt.js";
import userModel from "../../model/userModel.js"


//-----------------login------------

export const adminLogin=async(req,res)=>{

    const {adminEmail,adminPassword}=req.body
    console.log(adminEmail,adminPassword);


try {
    const result = await adminModel.findOne({ email: adminEmail });
    // console.log({result},'lllllllllllllllllllllllll')
    if(result){
        const { _id, name, role } = result; // No need to parse to JSON
        const token = generateAccessToken(_id, name, "Admin");
        // console.log({token});
        res.status(200).json({ success: "login success", result,token });
    } else {
        res.status(403).json({ errmsg: "Invalid password" });
      }



} catch (error) {
    console.log("Error:", error);
    res.status(500).json({ errmsg: "server error" });
}

    

}


//-------------mapping all user data-----------------------
export const fetchAllUsers = async (req, res) => {

    try {
      const fetchAllUsers = await userModel.find({});
      res.status(200).json({msg: "all user details got successfully",fetchAllUsers});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


//---------------block/unblock-user------------------------
export const userStatus = async (req,res)=>{
    try{
        const {userId,isBlocked} = req.body
        console.log({userId});
        console.log({isBlocked});

        if(isBlocked){
            await userModel.updateOne({_id:userId},{$set:{isBlocked:false}})
            return res.status(200).json({message:'Selected user Un-Blocked',isblocked:false})
        }else{
            await userModel.updateOne({_id:userId},{$set:{isBlocked:true}})
            return res.status(200).json({message:'Selected user blocked',isblocked:true})
        }
    }catch (err){
        return res.status(500).json({errmsg:'Server error'})
    }
  }