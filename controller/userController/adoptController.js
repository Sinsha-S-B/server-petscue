import petInfo from "../../model/rescueModel.js";


// export const fetchPet = async (req, res) => {
//     const { start, end ,search} = req.body;

  
//     try {
//         const reg = new RegExp(""+search+"", "i")
//         console.log(reg);
//       const totalCount = await petInfo.estimatedDocumentCount({});
//       const fetchPetDet = await petInfo.find({ petCategory: { $regex: reg } }).skip(start).limit(end);
      
//       res
//         .status(200)
//         .json({ msg: "pet details got successfully", fetchPetDet, totalCount });
//     } catch (error) {
//       console.log(error);
//     }
//   };


export const fetchPet = async (req, res) => {
  const { start, end } = req.body;


  try {
      
    const totalCount = await petInfo.estimatedDocumentCount({});
    const fetchPetDet = await petInfo.find({ }).skip(start).limit(end);
    
    res
      .status(200)
      .json({ msg: "pet details got successfully", fetchPetDet, totalCount });
  } catch (error) {
    console.log(error);
  }
};



  export const fetchSinglePet = async (req, res) => {
    const { id } = req.body;
    try {
      const fetchSingleData = await petInfo.findOne({ _id: id });
      console.log({ fetchSingleData });
      res.status(200).json({
        msg: "all pet details got successfully",
        fetchSingleData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
// export const searchPet = async (req, res) => {
//   const { search,start,end } = req.body;
//   console.log({search});

//   try {
    

//     // const searchPet = await petInfo.find({petCategory:search})
//     const searchPet = await petInfo.find({ petCategory: { $regex: search, $options: 'i' } }).skip(start).limit(end)
//     const totalCount = await petInfo.estimatedDocumentCount({ petCategory: { $regex: search, $options: 'i' } });

//     console.log({searchPet});
    
//     res
//       .status(200)
//       .json({ msg: "searched pet  got successfully", searchPet,totalCount });
//   } catch (error) {
//     console.log(error);
//   }
// };