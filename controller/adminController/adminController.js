import adminModel from "../../model/adminModel.js"
import { generateAccessToken } from "../../config/jwt.js";
import userModel from "../../model/userModel.js"
import expertModel from '../../model/expertModel.js'
import adopterInfo from "../../model/adoptModel.js";
import petInfo from "../../model/rescueModel.js"



//-----------------login------------

export const adminLogin=async(req,res)=>{

    const {adminEmail,adminPassword}=req.body
    console.log(adminEmail,adminPassword);


try {
    const result = await adminModel.findOne({ email: adminEmail });
    // console.log({result},'lllllllllllllllllllllllll')
    if(result){
        const { _id, name} = result; // No need to parse to JSON
        const token = generateAccessToken(_id, name, "Admin");
        // console.log({token});
        res.status(200).json({ success: "login success", result,token,role:"Admin" });
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

  //-------------mapping all adopter  data-----------------------
export const fetchAllAdopters = async (req, res) => {

  try {
    const fetchAllAdopter = await adopterInfo.find({});
    const adopterCount = await adopterInfo.countDocuments();
    const rescuerCount=await petInfo.countDocuments()
    // console.log({fetchAllAdopter});
    res.status(200).json({msg: "all adopter details got successfully",fetchAllAdopter,adopterCount,rescuerCount});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


 //-------------mapping all adopter  data for chart-----------------------
 export const Adopterschart = async (req, res) => {

  try {
    const monthlyPets = await adopterInfo.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          pets: { $push: '$$ROOT' },
          petCount: { $sum: 1 }
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);



    // return monthlyPets;
    console.log(monthlyPets);
   
    res.status(200).json({msg: "all Adopterschart details got successfully",monthlyPets});
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

  //-------------mapping all expert data-----------------------
export const fetchAllExperts = async (req, res) => {

    try {
      const fetchAllExperts = await expertModel.find({});
      console.log({fetchAllExperts});
      res.status(200).json({msg: "all expert details got successfully",fetchAllExperts});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  //---------------allow/denay-expert------------------------
export const expertStatus = async (req,res)=>{
    try{
        const {expertId,adminVerified} = req.body
        console.log({expertId});
        console.log({adminVerified});

        if(adminVerified){
            await expertModel.updateOne({_id:expertId},{$set:{adminVerified:false}})
            return res.status(200).json({message:'Selected Expert is verified',adminVerified:false})
        }else{
            await expertModel.updateOne({_id:expertId},{$set:{adminVerified:true}})
            return res.status(200).json({message:'Selected Expert is verified',adminVerified:true})
        }
    }catch (err){
        return res.status(500).json({errmsg:'Server error'})
    }
  }

 



  