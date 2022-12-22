import nodemailer from "nodemailer"
import {get} from "../config";

import 'dotenv/config';
console.log(process.env)

var email = get(process.env.NODE_ENV).Email
console.log(email);

export const sendMail = (from,to,subject,text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email.username,
            pass: email.password
        }
    });
var mailOptions = {
    from:from,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
})}
