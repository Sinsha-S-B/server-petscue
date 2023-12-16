import petInfo from "../../model/rescueModel.js";
import adopterInfo from "../../model/adoptModel.js";
import { ObjectId } from "mongoose";

// export const fetchPet = async (req, res) => {
//     const { start, end ,search} = req.body;

//     try {
//         const reg = new RegExp(""+search+"", "i")
//         console.log(reg);
// const totalCount = await petInfo.estimatedDocumentCount({});
// const fetchPetDet = await petInfo.find({ petCategory: { $regex: reg } }).skip(start).limit(end);

//       res
//         .status(200)
//         .json({ msg: "pet details got successfully", fetchPetDet, totalCount });
//     } catch (error) {
//       console.log(error);
//     }
//   };

export const fetchPet = async (req, res) => {
  const { pageNumber, limit } = req.body;

  try {
    const skip = (pageNumber - 1) * limit;

    const fetchPetDet = await petInfo
      .find({ adopted: false })
      .skip(skip)
      .limit(limit);
    const totalCount = await petInfo.countDocuments({ adopted: false });

    console.log({ fetchPetDet });

    res
      .status(200)
      .json({ msg: "pet details got successfully", fetchPetDet, totalCount });
  } catch (error) {
    console.log(error);
  }
};

// export const fetchPet = async (req, res) => {
//   const { start, end } = req.body;

//   try {
//     const totalCount = await petInfo.estimatedDocumentCount({});
//     const fetchPetDet = await petInfo.find({}).skip(start).limit(end);

//     res
//       .status(200)
//       .json({ msg: "pet details got successfully", fetchPetDet, totalCount });
//   } catch (error) {
//     console.log(error);
//   }
// };

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

export const adoptSinglePet = async (req, res) => {
  const { name, email, phone, image, userId, petId } = req.body;
  console.log("hhhhhhhhhhhh", req.body);
  console.log({userId},'pppppppppppppppppppppppppppppppppppppppppppppppp');

  try {
    const sameId = await adopterInfo.findOne({ petId });
    console.log({ sameId });

    if (sameId) {
      res.json({ msg: "id exist" });
    } else {
      const adoptSingleData = await adopterInfo.create({
        name,
        email,
        phone,
        image,
        petId,
        userId,
      });
      console.log({adoptSingleData},'ooooooooooooooooooooooooooooooo');


      const updatePetInfo = await petInfo.updateOne(
        { adopted: false }, // filter criteria to match documents where adopted is false
        { $set: { adopted: true } } // update operation to set adopted to true
      );

      console.log({ adoptSingleData });
      console.log({ updatePetInfo });
      if (adoptSingleData) {
        res.status(200).json({
          msg: "adopter details  successfully registered",
          adoptSingleData,
        });
      } else {
        res.json({ msg: "somthing went wrong" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//------------pet filter------------

export const filterPets = async (req, res) => {
  const { prio } = req.body;
  // console.log({prio});
  try {
    const filteredPets = await petInfo.find({
      petCategory: prio.priority,
      adopted: false,
    });
    console.log({ filteredPets });
    res.status(200).json({ filteredPets });
  } catch (error) {
    res.json({ msg: "somthing went wrong", error });
  }
};
