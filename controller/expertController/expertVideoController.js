import expertVideoSchema from "../../model/expertVideoModel.js";



//----------uploding expert video-------
export const expertVideoUpload = async (req, res) => {
  const { discription, video, expertId } = req.body;
  console.log("req", req.body);

  try {
    const expertVideoExsist = await expertVideoSchema.findOne({ video: video });
    const disExist= await expertVideoSchema.findOne({ discription: discription });

    if (expertVideoExsist) {
      return res.json({ errmsg: "Video  already exists" });
    }else if(disExist){
      return res.json({ errmsg: " same discription already exists" });
    }

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errmsg: "Server error" });
  }
};

//===========fetching expert videos==================

export const fetchExpertVideo = async (req, res) => {
  const {expertId} = req.body
  console.log({expertId});

  try {
    const fetchExpertVideo = await expertVideoSchema.find({ expertId: expertId });
    const fetchExpertVideoCount= await expertVideoSchema.countDocuments({ expertId: expertId });

    console.log({fetchExpertVideo});
    console.log({fetchExpertVideoCount});

    // Handle the response based on your requirements
    return res.status(200).json({ msg: "Expert videos fetched", fetchExpertVideo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errmsg: "Server error" });
  }
};




