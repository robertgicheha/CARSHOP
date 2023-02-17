import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
import sendMail from '../helpers'
import mssql from 'mssql'
import { sqlConfig } from '../config'
dotenv.config({ path: path.resolve(__dirname, '../.env') })


interface User{
  userId:string
  userName:string
  email:string
  password:string
  address:string
  fullName:string
  phoneNo:string
  country:string
  emailSent:string
  }
const sendWelcomeEmail = async () => {
  const pool = await mssql.connect(sqlConfig)
  const users:User[] = await(await pool.request().execute('SpSendWelcomeEmails')).recordset
  // console.log(users);
  for(let user of users){


    ejs.renderFile('templates/registration.ejs',{userName:user.userName}, async (error, html) => {
        
        //message configuration
      const message = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "NodeMailer",
        html
      };
      //  console.log(html);
       
        //sending email
      try {
        await sendMail(message)
        await pool.request()
        .input('IdUser',user.userId)
        .execute(`SpUpdateUserSentEmail`)
      } catch (error:any) {
        console.log(error.message);
        
      }
    
    })
    }
}



export default sendWelcomeEmail
//creating a transporter
// const transporter = nodemailer.createTransport({
//     host:'smtp.gmail.com',
//     service:'gmail',
//     port:587,
//     auth:{
//         user:process.env.EMAIL,
//         pass:process.env.PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
//   });