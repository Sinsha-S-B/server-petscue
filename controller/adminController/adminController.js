import adminModel from "../../model/adminModel.js"



//-----------------login------------

export const adminLogin=async(req,res)=>{

    const {adminEmail,adminPassword}=req.body
    console.log(adminEmail,adminPassword);


try {
    const result = await adminModel.findOne({ email: adminEmail });
    console.log({result},'lllllllllllllllllllllllll')
    res.status(200).json({ success: "login success", result });
} catch (error) {
    console.log("Error:", error);
    res.status(500).json({ errmsg: "server error" });
}

    

}