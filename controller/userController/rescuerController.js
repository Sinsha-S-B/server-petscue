import petInfo from "../../model/rescueModel.js";

export const rescuerForm = async (req, res) => {
  let {name,phone,district,currentLocation,address,health,petCategory,imageUri} = req.body;

  console.log("body",req.body);
  try {
    const petDetails = await petInfo.create({
      name,
      phone,
      district,
      currentLocation,
      address,
      health,
      petCategory,
      imageUri,
    });
    console.log({petDetails});
  

    res.status(200).json({ message: "Successfully Registered ", petDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "server error" });
  }
};



