import mongoose from "mongoose";

const expertSchema = mongoose.Schema({
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
  certificate :{
    type : String,
  }
});
const Expert = mongoose.model("Expert", expertSchema);
export default Expert;
