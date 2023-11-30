import mongoose from "mongoose";

const adoptSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    date: {
      type: String,
    },
    image: {
      type: Array,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    petId: {
      type: String,
    },
    UserId: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const adopterInfo = mongoose.model("adopterInfo", adoptSchema);
export default adopterInfo;
