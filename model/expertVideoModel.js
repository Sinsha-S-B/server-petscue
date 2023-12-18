import mongoose from "mongoose";

const expertVideoSchema = mongoose.Schema({
  video: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  expertId: {
    type: String,
  },
  isBlocked:{
    type:Boolean,
    default:false,
  }
});
const ExpertVideo = mongoose.model("ExpertVideo", expertVideoSchema);

export default ExpertVideo;
