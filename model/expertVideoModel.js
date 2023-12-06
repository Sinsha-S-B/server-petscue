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
});
const ExpertVideo = mongoose.model("ExpertVideo", expertVideoSchema);

export default ExpertVideo;
