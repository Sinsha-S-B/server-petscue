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
  address:{
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
  }, 
  adopted: {
    type: Boolean,
    default: false,
    
  },
  
},

{timestamps: true});

const petInfo = mongoose.model("petInfo", rescueSchema);
export default petInfo;
