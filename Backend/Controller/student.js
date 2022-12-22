import mongoose from "mongoose";
import student from "../Model/student";
import bcrypt from 'bcryptjs';
import {sendMail} from '../Middleware/sentMail';

import jwt from 'jsonwebtoken';

//studentSignup(post)
export const studentSignup = async (req, res) => {
    const studentSign = new student({
        name: req.body.name,
        email: req.body.email,
        standard: req.body.standard,
        grade: req.body.grade,
        percentage: req.body.percentage,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    const data = await studentSign.save();
    if (data) {
        res.send({
            status:true,
            message: " success",
            result: data,
        });
        const result = sendMail("pratikshaladke97@gmail.com", req.body.email, "Registration Successfull","welcome");
    }
    else {
        res.send({
            status: 400,
            message: "Failed",
            result: data,
        });
    }
}
//studentlogin(post)
export const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await student.findOne({ email });
        if (!user) {
            return res.send({
                status: false,
                message: "Invalid Credentials",
                code: true,
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
                        status: true,
                        message: "Success",
                        result: token,
                    });
                }
            );
        } else {
            return res.send({
                status: false,
                message: "Failed",
                code: 400,
            });
        }
    } catch (e) {
        console.log(e);
    }
};

//studentlist(get)
export const studentList = async (req, res) => {
    const studentdata = await student.find({})
    res.send({
        status: true,
        message: "List is displayed Successfully ",
        result: studentdata,
    });
}

//  Registration (MULTER)post
export const uploadFile = async (req, res) => {
    const studReg = new student({
        name: req.body.name,
        image: req.file.filename,
        email: req.body.email,
        password: req.body.password,
        standard: req.body.standard,
        grade: req.body.grade,
        percentage: req.body.percentage,

    });

    console.log("body" + JSON.stringify(req.file));

    const data = await studReg.save();
    try {
        res.send({
            status: "true",
            message: "successfully upload",
            result: data
        });
    }
    catch (e) {
        res.send({
            status: "400",
            message: "Failed upload",

        });


    }
}

// delete Record from db (also delete img )
export const deleteStudent = async (req, res) => {
    let _id = req.params.id;
    const studDetails = await student.findById(_id);
    if (studDetails) {
        var image = studDetails.image;
        const result = await student.deleteOne({ _id: mongoose.Types.ObjectId(_id) })
        if (result) {
            console.log("delete successfully");
            return res.send({
                status: true,
                message: " Successfully deleted ",
            });
        }
        else {
            return res.send({
                status: 500,
                message: "Invalid Id ",
            });
        }
    }

}

//updatestudent(put)
export const updateStudent = async (req, res) => {
    try {
        var jsondata = {};

        if (req.body.name) {
            jsondata.name = req.body.name;

        }
        if (req.body.image) {
            jsondata.image = req.body.image;

        }
        if (req.body.email) {
            jsondata.email = req.body.email;

        }
        if (req.body.password) {
            jsondata.password = req.body.password;

        }
        if (req.body.standard) {
            jsondata.standard = req.body.standard;

        }
        if (req.body.grade) {
            jsondata.grade = req.body.grade;

        }
        if (req.body.percentage) {
            jsondata.percentage = req.body.percentage;
        }

        student.updateOne({ _id: mongoose.Types.ObjectId(req.body._id) },
            { $set: jsondata },
            { new: true },
            (err, result) => {
                if (err) {
                    res.send({
                        status: "400",
                        message: "not updated",
                        result: result
                    });
                }
                else {
                    res.send({
                        status: "true",
                        message: "successfully updated",
                        result: result
                    });
                }
            })
    }
    catch (error) {
        throw (error)
    }
}

//get all details by id 
export const getDetailById = async (req, res) => {

    try {
        var _id = req.query._id
        const id = await student.findById(_id);
        console.log(id)
        res.send({
            status: true,
            message: " successfully getting details ",
            result: id
        })
    }
    catch (e) {
        return res.send({
            status: false,
            message: "error",
            result: e
        })
    }
  
}