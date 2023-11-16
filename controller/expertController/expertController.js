import expertModel from  '../../model/expertModel.js'
import bcrypt from "bcrypt"


//---------------------signu_up---------------------------


export const expertSignup = async (req, res) => {
  try {
    console.log("register");
    let { name, email, phone, password } = req.body;

    // const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password.trim(), 10);

    const expertExsist=await expertModel.findOne({email:email})

    if(expertExsist){
      res.json({ errmsg: "email already exisist" });

    }else{
      const newExpert = await expertModel.create({
        name,
        email,
        phone,
        password: hashPassword,
      });
      console.log(newExpert);
      if (newExpert) {
        res.status(200).json({ message: "Successfully Registered ", newExpert });
      } else {
        res.json({ errmsg: "Cant create newExpert" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "server error" });
  }
};

//------------------login------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, password);

  try {
    const result = await expertModel.findOne({ email: email });

    if (result) {
      bcrypt.compare(password, result?.password, async (err, isMatch) => {
        if (err) {
          res.status(500).json({ errmsg: "Server error" });
        } else if (isMatch) {
          const { _id, name, role } = result; // No need to parse to JSON
          const token = generateAccessToken(_id, name, role);

          res.status(200).json({ success: "Login success", result, token });
        } else {
          res.status(403).json({ errmsg: "Invalid password" });
        }
      });
    } else {
      res.status(404).json({ errmsg: "Email not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: "Server error" });
  }
};



  

