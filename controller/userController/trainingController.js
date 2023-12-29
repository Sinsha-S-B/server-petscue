import expertVideoSchema from "../../model/expertVideoModel.js";
import expertModel from  '../../model/expertModel.js'




export const fetchAllExperts=async (req,res)=>{
    try {
        const fetchAllExperts = await expertModel.find({ $and: [{ adminVerified: true }, { isBlocked: false }] });

        console.log({fetchAllExperts});
        res.json({msg:"fetchAllExperts got",fetchAllExperts})
        
    } catch (error) {
        res.json({msg:"catch error",error})
    }
    
    }