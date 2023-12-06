import expertVideoSchema from "../../model/expertVideoModel.js";

export const expertVideoUpload = async (req, res) => {
  const { discription, video, expertId } = req.body;
  console.log("req", req.body);

  try {
    const expertVideoExsist = await expertVideoSchema.findOne({ video: video });

    if (expertVideoExsist) {
      // Check if video is not null before accessing its property
      if (expertVideoExsist.video !== null) {
        console.log(expertVideoExsist.video);
      }

      // Send response and return to avoid executing the rest of the code
      return res.json({ errmsg: "Same video exists" });
    } else {
      const expertVideoUpload = await expertVideoSchema.create({
        expertId,
        discription,
        video,
      });
      console.log({ expertVideoUpload });

      if (expertVideoUpload) {
        return res.status(200).json({ msg: "Video uploaded", expertVideoUpload });
      } else {
        return res.json({ errmsg: "Can't upload video" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errmsg: "Server error" });
  }
};


export const expertVideoEdit = async (req, res) => {
  const { discription, video } = req.body;
  console.log("req", req.body);
  try {
    //   const hashPassword = await bcrypt.hash(password.trim(), 10);

    //   const expertExsist=await expertModel.findOne({email:email})

    //   if(expertExsist){
    //     res.json({ errmsg: "email already exisist" });

    //   }else{
    const expertVideoUpload = await expertVideoSchema.create({
      discription,
      video,
    });
    res.status(200).json({ msg: "video uploaded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "server error" });
  }
};
