import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env')})

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}


// checking connection
const checkConnection = async () => {
    try {
       const connection = await mssql.connect(sqlConfig) 
       if(connection.connecting){
        console.log('Connecting......');
        
       }
       if(connection.connected){
        console.log('Database connected')
       }
    } catch (error) {
        console.log(error);
        
    }
}
checkConnection()

