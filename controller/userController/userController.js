import { json } from "express";
import { generateAccessToken } from "../../config/jwt.js";
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

// export const login = async (req, res) => {
//   const { emails, password } = req.body;

//   try {
//     const result = await userModel.findOne({ email: emails });

//     console.log({result});
//     if (result === null) {

//       res.status(403).json({ errmsg: "arjun not founddddddd" });
//       return; // Return early to exit the function
//     }

//     bcrypt.compare(password, result.password, ( err,isMatch) => {

//       if (err) {
//         console.log("Error comparing passwords:", err);

//       } else if (isMatch) {
//         const { _id, name } = JSON.parse(JSON.stringify(result));
//         console.log({_id});

//         const token = generateAccessToken(_id, name, "user");

//         res.status(200).json({ success: "login success", result, token });

//       } else {
//         res.status(403).json({ errmsg: "invalid password"  });
//       }
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ errmsg: "server error" });
//   }
// };

export const login = async (req, res) => {
  const { emails, password } = req.body;
  console.log(req.body, password);

  try {
    const result = await userModel.findOne({ email: emails });

    if (result) {
      bcrypt.compare(password, result?.password, async (err, isMatch) => {
        if (err) {
          res.status(500).json({ errmsg: "Server error" });
        } else if (isMatch) {
          const { _id, name, role } = result; // No need to parse to JSON
          const token = generateAccessToken(_id, name, role);

          res.status(200).json({ success: "Login success", result, token });
        } else {
          res.status(403).json({ errmsg: "Invalid password" });
        }
      });
    } else {
      res.status(404).json({ errmsg: "Email not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "Server error" });
  }
};

//----------------otp verification-----------------------

export const createOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const OTP = otpSend(email);
    const otpString = OTP.toString();

    await userModel.updateMany(
      { email: email },
      { $set: { OTP: otpString, isVerified: true } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const findOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpMatch = await userModel.findOne({
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

//-----------profile--------------

export const storeImage = async (req, res) => {
  const { userId, image } = req.body;
  console.log(req.body, "heloooooooooooooooooooooooooo");
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
