import petInfo from "../../model/rescueModel.js";

export const rescuerForm = async (req, res) => {
  let {
    name,
    phone,
    district,
    currentLocation,
    Address,
    health,
    petCategory,
    imageUri,
  } = req.body;

  
  try {
    const petDetails = await petInfo.create({
      name,
      phone,
      district,
      currentLocation,
      Address,
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

// export const fetchPet = async (req, res) => {
//   const { start, end } = req.body;

//   try {
//     const totalCount = await petInfo.estimatedDocumentCount({});
//     console.log(totalCount);

//     const fetchPetDet = await petInfo.find({}).skip(start).limit(end);
    
//     res
//       .status(200)
//       .json({ msg: "pet details got successfully", fetchPetDet, totalCount });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const fetchSinglePet = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const fetchSingleData = await petInfo.findOne({ _id: id });
//     console.log({ fetchSingleData });
//     res.status(200).json({
//       msg: "all pet details got successfully",
//       fetchSingleData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


