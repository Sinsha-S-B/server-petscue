import jwt from "jsonwebtoken";

const userVerification = async (req, res, next) => {
  console.log(req.headers.userauthorization, "lllllllll");

  const token = req.headers.userauthorization

  try {
    const data = jwt.verify(token,"jwtAccessSecretname");
    console.log(data,'lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll');

    // if (data) {
    //   next();
    // }
  } catch (error) {
    console.log(error);
  }
};

export default userVerification;
