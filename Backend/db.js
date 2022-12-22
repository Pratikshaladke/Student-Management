import mongoose from 'mongoose';

const config = require("./config");
import 'dotenv/config';
console.log(process.env)

const configValue = config.get(process.env.NODE_ENV);//reading staging configuration

const DB = configValue["DB"];

var option = {
    user:DB.USERNAME,
    password:DB.PASSWORD,
}

const MONGOURL = `mongodb://pratikshaladke:pratikshaladke45@${DB.HOST}:${DB.PORT}/${DB.DATABASE}`
console.log(MONGOURL)

export const mongoconn = async () => {
try{
        await mongoose.connect(MONGOURL);
        console.log("Connection to DB");
    }
catch (e) 
{
    console.log(e);
    throw e
}
}
