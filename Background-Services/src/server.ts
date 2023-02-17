import express from 'express'
import cron from 'node-cron'
import sendWelcomeEmail from './emailService/email';

const app= express()

//sheduler to check for any new resgistered users
cron.schedule('*/5 * * * * *', async() => {
  console.log('Checking for a new registration after every 15 Seconds');
  await sendWelcomeEmail()
});


app.listen(4002, ()=>{
    console.log('App is Running');
    
})