import expertVideoSchema from "../../model/expertVideoModel.js";
import expertModel from  '../../model/expertModel.js'

// export const fetchVideos=async (req,res)=>{
// try {
//     const fetchVideos=await expertVideoSchema.find({})
//     console.log(fetchVideos);
//     res.json({msg:"videos got"})
    
// } catch (error) {
//     res.json({msg:"catch error",error})
// }

// }


export const fetchAllExperts=async (req,res)=>{
    try {
        const fetchAllExperts=await expertModel.find({ adminVerified: true})
        console.log({fetchAllExperts});
        res.json({msg:"fetchAllExperts got",fetchAllExperts})
        
    } catch (error) {
        res.json({msg:"catch error",error})
    }
    
    }