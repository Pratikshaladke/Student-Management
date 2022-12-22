import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import { mongoconn } from './db';
mongoconn();
import student from './Routes/student'
import teacher from './Routes/teacher';
import cors from 'cors'
app.use(cors({origin:"*"}));

app.use(bodyParser.urlencoded({

    extended: true

}));
app.use(bodyParser.json());

app.use("/uploads",express.static("uploads"));//to see image in frontend

app.use("/student",student)
app.use("/teacher",teacher);

export default app;
