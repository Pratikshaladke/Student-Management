import mongoose from 'mongoose'
const studentData = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    // image:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    standard:{
        type:Number,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    }
})
export default mongoose.model("student",studentData);