import express from 'express';
import {studentSignup,studentLogin,studentList,uploadFile,deleteStudent,updateStudent,getDetailById} from '../Controller/student';
import {upload} from '../Middleware/uploadFile';
import { sendMail } from '../Middleware/sentMail';

const router = express.Router();

router.post("/studentSignup",sendMail,studentSignup)
router.post("/studentLogin",studentLogin)
router.get("/studentList",studentList)
router.post("/uploadFile",upload.single('image'), uploadFile);
router.delete("/deleteStudent/:id",deleteStudent)
router.put("/updateStudent",updateStudent)
router.get("/getDetailById",getDetailById)

export default router;