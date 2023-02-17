import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

//transporter with configurations
const transporter = (config:any) => {
    return nodemailer.createTransport(config)
}

const config = {
    host:'smtp.gmail.com',
    service:'gmail',
    port:587,
   
    auth:{
        // type: "OAUTH2",
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    },
    
    tls: {
        rejectUnauthorized: false
    }
}

console.log(process.env.EMAIL,process.env.PASSWORD);


const sendMail = async (messageOptions:any) => {
    let transporterSend = transporter(config)
    transporterSend.verify()
    await transporterSend.sendMail(messageOptions, (error, info) => {
        if(error){
            console.log(error);
            
        }

        

    })
}

export default sendMail