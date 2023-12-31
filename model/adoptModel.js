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
    userId: {
      type: String,
      
    },
    adopted: {
      type: Boolean,
      default: true,
      
    },
  },
  { timestamps: true }
);

const adopterInfo = mongoose.model("adopterInfo", adoptSchema);
export default adopterInfo;
