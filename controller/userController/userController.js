import { json } from "express";
import { generateAccessToken, generateRefreshToken } from "../../config/jwt.js";
import userModel from "../../model/userModel.js";
import { otpSend } from "./otpVerification.js";
import bcrypt from "bcrypt";

//-----------------------signup----------------------
export const signup = async (req, res) => {
  try {
    console.log("register");
    let { name, email, phone, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password.trim(), salt);
    const userExsist = await userModel.findOne({ email: email });
    
    if (userExsist) {
      res.json({ errmsg: "email already exist" });
    } else {
      const newUser = await userModel.create({
        name,
        email,
        phone,
        password: hashPassword,
      });
      if (newUser) {
        res.status(200).json({ message: "Successfully Registered ", newUser });
      } else {
        res.json({ errmsg: "Cant create newUser" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "server error" });
  }
};

//-------------------login----------------------



export const login = async (req, res) => {
  const { emails, password} = req.body;
  console.log(req.body);

  try {
    const result = await userModel.findOne({ email: emails });

    console.log({result});
 

    if (result) {
      if(result.isBlocked===false){
         bcrypt.compare(password, result?.password, async (err, isMatch) => {
        if (err) {
          res.status(500).json({ errmsg: "Server error" });
        } else if (isMatch) {
          const { _id, name} = result; // No need to parse to JSON
          
          const token = generateAccessToken(_id, name, "User");
          const refreshToken = generateRefreshToken(_id, name, "User");


          res.status(200).json({ success: "Login success", result,refreshToken, token,role:"User" });
        } else {
          res.status(403).json({ errmsg: "Invalid password" });
        }
      });
      }else{
        res.json({ errmsg: "User is blocked" })
      }
     
    } else {
      res.status(404).json({ errmsg: "Email not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "Server error" });
  }
};

//--------------------------google login------------------------------------

export const googleLogin = async (req, res) => {
  try {
    let { profile } = req.body;
    const email = profile?.email;
    const name = profile?.name;
    const profileImage = profile?.picture;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      const newUser = await userModel.create({
        email,
        name,
        profileImage,
        isVerified: true,
      });
      const token = generateAccessToken(newUser._id, "user");
      res.status(200).json({
        message: "User login successfully",
        name: newUser.name,
        userId: newUser._id,
        token,
        role: "user",
      });
    } else if (user.isBlocked) {
      res.status(403).json({ errmsg: "user is blocked by admin" });
    } else {
      if (!user.isVerified) {
        if (!user.profileImage) {
          await userModel.updateOne({ email }, { $set: { profileImage, isVerified: true } });
        } else {
          await userModel.updateOne({ _id: user._id }, { $set: { isVerified: true } });
        }
        const token = generateToken(user._id, "user");
        // console.log({token})

        
        res.status(200).json({
          message: "user login successfully",
          name: user.name,
          token,
          userId: user._id,
          role: "user",
        });
      } else {
        if (!user.profileImage) {
          await userModel.updateOne({ email }, { $set: { profileImage } });
        }
        const token = generateToken(user._id, "user");
        res.status(200).json({
          message: "user login successfully",
          name: user.name,
          token,
          userId: user._id,
          role: "user",
        });
      }

    }
  } catch (err) { }
};


//----------------otp verification-----------------------

export const createOtp = async (req, res) => {
  const { email } = req.body;
  
 

  try {
    const OTP = otpSend(email);
    
    const otpString = OTP.toString();
    console.log({otpString},'ssssssssssssssssssssssss');

    // await userModel.updateMany(
    //   { email: email },
    //   { $set: { OTP: otpString, isVerified: true } }
    // );
    await userModel.updateMany(
      { email: email },
      { $set: { OTP: otpString} }
    );

  } catch (error) {
    console.log(error);
  }
};

export const findOtp = async (req, res) => {
  console.log('lllllllllllllllll');
  const { email, otp,second } = req.body;

  console.log(second,'finddddddddddddddddddddddddddddddd');
  try {

    

    const otpMatch = await userModel.findOne({
      $and: [{ email: email, OTP: otp }],
    });
    console.log(otpMatch);
    
    if (otpMatch !== otp && otpMatch==null) {
      res.status(200).json({ errmsg: "otp not matched", otpMatch });
    } else {
      
    await userModel.updateMany(
      { email: email },
      { $set: {  isVerified: true } }
    );
      res.status(200).json({ message: "otp matched", otpMatch });
    }
  } catch (error) {
    console.log(error);
  }
};

//-----------profile--------------

export const storeImage = async (req, res) => {
  const { userId, image } = req.body;
  // console.log(req.body, "heloooooooooooooooooooooooooo");
  try {
    const profileImage = await userModel.updateOne(
      {
        _id: userId,
      },
      { $set: { profileImage: image } }
    );

    res.status(200).json({ message: "image stored", profileImage });
  } catch (error) {}
};

export const FindById = async (req, res) => {
  const { userId } = req.body;
  try {
    const profileData = await userModel.findOne({ _id: userId });
    if (profileData) {
      res.status(200).json({ sucess: "Founded succesfully", profileData });
    } else {
      res.status(401).json({ Message: "Not Fouund" });
    }
  } catch (error) {
    res.status(500).json({ Message: "Internal server Error" });
  }
};

export const editUser=async(req,res)=>{
  const {userId,newName,newPhone}=req.body
  console.log({newName});
  try {
    const editUser=await userModel.updateMany(
      {
        _id: userId,
      },
      { $set:{name:newName,phone:newPhone}}
      
      )

    console.log(editUser);
    if(editUser){

      res.status(200).json({ sucess: "Updated succesfully", editUser });
    }else{
      res.status(401).json({ Message: "Cant edit" });

    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal server Error" });
    
  }
}







//-----------forgot password-----------

export const findEmail = async (req, res) => {
  const { email } = req.body;
  console.log(req.body, "iiiiiiiiiiiiiiiiiiiiiiii");

  try {
    if (email) {
      const result = await userModel.findOne({ email: email });

      if (result) {
        res.status(200).json({ success: "email found", result });
      } else {
        res.json({ msg: "email could not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "server error" });
  }
};

export const matchingOtp = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const data = await userModel.find({ email: email });
    console.log(data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    //  if(data.OTP === otp)
  } catch (error) {
    console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrr");
  }
};

//---------------updating the password--------------

export const resetpassword = async (req, res) => {
  const { resetpassword, email } = req.body;
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(resetpassword.trim(), salt);

  try {
    const password = await userModel.updateOne(
      { email: email },
      { $set: { password: hashPassword } }
    );

    if (password) {
      res.status(200).json({ msg: "password updated" });
    } else {
      res.json({ fail: "password is not upadted" });
    }
  } catch (error) {
    console.log(error);
  }
};


export const refreshToken= (req, res) => {
  const { refresh_token } = req.body;

  // Verify the refresh token
  jwt.verify(refresh_token, secretKey, (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Invalid refresh token' });
      }

      // At this point, the refresh token is valid, and you can generate a new access token
      const newAccessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

      // Send the new access token to the client
      res.json({ access_token: newAccessToken });
  });
}







