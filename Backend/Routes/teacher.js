import express from 'express';
import { teacherSignup ,teacherLogin,getUserDataById} from "../Controller/teacher";
import { verifyToken } from '../Middleware/verifyToken';
const router = express.Router();

router.post("/teacherSignup",teacherSignup)
router.post("/teacherLogin",teacherLogin)
router.get("/getUserDataById",verifyToken,getUserDataById);

export default router;