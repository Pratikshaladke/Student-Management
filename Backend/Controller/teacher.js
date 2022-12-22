import mongoose from "mongoose";
import teacher from "../Model/teacher";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

// teacher signup  (post)
export const teacherSignup = async (req, res) => {

  const addteacher = new teacher({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const data = await addteacher.save();

  res.send({
    status: "200",
    message: "teacher successfully signup",
    result: data
  })
}

// teacher login 
export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await teacher.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        message: "Invalid Credentials",
        code: 200,
      });
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (isValid) {
      let payload = {};
      payload._id = user._id;
      payload.email = user.email;
      // payload.password = user.password;
      jwt.sign(
        payload,
        "PRATIKSHA",
        {
          expiresIn: "24h",
        },
        (err, token) => {
          return res.send({
            status: 200,
            message: "Success",
            result: token,
          });
        }
      );
    } else {
      return res.send({
        status: true,
        message: "Failed",
        code: 200,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

//get dataByID
export const getUserDataById = async (req,res) =>{
  try{
  let dataid = await teacher.find({_id:mongoose.Types.ObjectId(req.user._id)});
  res.send({
      status : "200",
      message : "successfully",
      result: dataid   
  })
}
catch(e){
  throw e
}
}  

// export const getUserDataById = async (req, res) => {
//   let patientData = await teacher.find({ _id: mongoose.Types.ObjectId(req.body._id) })
//   res.send({
//     status: "200",
//     message: "successfully addedpatientdatabyid ",
//     result: patientData
//   })
// }