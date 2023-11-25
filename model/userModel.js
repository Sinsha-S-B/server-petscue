import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  OTP: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImage :{
    type : String,
  },
  isBlocked:{
    type:Boolean,
    default:false,
  }
});

const User = mongoose.model("User", userSchema);
export default User;
