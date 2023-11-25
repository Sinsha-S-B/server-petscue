import mongoose from "mongoose";

const rescueSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  phone: {
    type: Number,
  },
  district: {
    type: String,
  },
  currentLocation:{
    type:Object
    
  },
  Address:{
    type:String,
  },
  date: {
    type: String,
  },
  
  health :{
    type : String,
  },
  petCategory:{
    type:String,
  },
  imageUri :{
    type : Array,
    required : true
  }
},{timestamps: true});

const petInfo = mongoose.model("petInfo", rescueSchema);
export default petInfo;
