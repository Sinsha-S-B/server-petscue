import expertModel from  '../../model/expertModel.js'
import bcrypt from "bcrypt"
import { otpSend } from './expertOtpVerification.js';
import { generateAccessToken } from "../../config/jwt.js";


//---------------------signu_up---------------------------


export const expertSignup = async (req, res) => {
  const {name, email, phone,experience,image,certificate,password}=req.body
  console.log("req",req.body);
  try {
   
    const hashPassword = await bcrypt.hash(password.trim(), 10);

    const expertExsist=await expertModel.findOne({email:email})

    if(expertExsist){
      res.json({ errmsg: "email already exisist" });

    }else{
      const newExpert = await expertModel.create({
        name,
        email,
        phone,
        experience,
        image,
        certificate,
        password: hashPassword
      });
      console.log({newExpert});
      if (newExpert) {
        res.status(200).json({ message: "Successfully Registered ", newExpert });
      } else {
        res.json({ errmsg: "Cant create newExpert" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "server error" });
  }
};


//---------------otp verification---------------------
export const createOtp = async (req, res) => {
  const { email } = req.body;
  // console.log(req.body);
 

  try {
    const OTP = otpSend(email);
    const otpString = OTP.toString();

    await expertModel.updateMany(
      { email: email },
      { $set: { OTP: otpString, emailVerified: true } }
    );
  } catch (error) {
    console.log(error);
  }
};


export const findOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpMatch = await expertModel.findOne({
      $and: [{ email: email, OTP: otp }],
    });
    if (otpMatch == null) {
      res.status(200).json({ errmsg: "otp not matched", otpMatch });
    } else {
      res.status(200).json({ message: "otp matched", otpMatch });
    }
  } catch (error) {
    console.log(error);
  }
};
//------------------login------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body, password);

  try {
    const result = await expertModel.findOne({ email: email });
    // console.log({result});

    if (result) {
      if(result.adminVerified==true){
         bcrypt.compare(password, result?.password, async (err, isMatch) => {
        if (err) {
          res.status(500).json({ errmsg: "Server error" });
        } else if (isMatch) {
          const { _id, name, role } = result; // No need to parse to JSON
          const token = generateAccessToken(_id, name, "expert");

          res.status(200).json({ success: "Login success", result, token,role:"expert" });
        } else {
          res.status(403).json({ errmsg: "Invalid password" });
        }
      });
      }else{
        res.status(404).json({ errmsg: "Wait for admin verification" });

      }

     
    } else {
      res.status(404).json({ errmsg: "Email not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "Server error" });
  }
};


//----------------expert profile--------------------
export const ExpertFindById = async (req, res) => {
  const expertId= req.params.id
  console.log(expertId);

  try {
    const ExpertprofileData = await expertModel.findOne({ _id: expertId });
    console.log({ExpertprofileData});
    if (ExpertprofileData) {
      res.status(200).json({ sucess: "Expert data Founded succesfully", ExpertprofileData });
    } else {
      res.status(401).json({ Message: "Expert data Not Fouund" });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server Error" });
  }
};


  

