import {  Request, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../config'
import {registration, loginSchema} from '../Helpers'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { UserRegistrationType } from '../Models' 


interface ExtendedRequest extends Request{
    body:{ userId:string , userName:string , email:string , password:string , address:string,
         fullname:string, phoneNo:string, country:string, confirmPassword:string}
}

export  const registerUser = async (req:ExtendedRequest, res:Response) => {
    
    try {
       const IdUser = uid()
       const pool = await mssql.connect(sqlConfig)
       const{userName, email,password,address,fullname,phoneNo,country}= req.body
       
       //encypting a password
       const encryptPassword = await bycrypt.hash(password,10)
       console.log(encryptPassword);
       
       const{error}=registration.validate({userName,email, password})
    if (error){
      return res.status(400).json(error.details[0].message)
    } 

       await pool.request()
       .input('IdUser',IdUser)
       .input('Name',userName)
       .input('Email',email)
       .input('Password',encryptPassword)
       .input('Address',address)
       .input('Fullname',fullname)
       .input('PhoneNo',phoneNo)
       .input('country',country)
       .execute('spRegisterUser')
       res.status(200).json({message:'User Registered'})

    } catch (error:any) {
        res.status(500).json(error.message)
    }
}

export const login = async (req:ExtendedRequest, res:Response) => {
    try {
        const{userName,password}= req.body  
        const{error}=loginSchema.validate({userName,password})
        if (error){
          return res.status(400).json(error.details[0].message)}

        //check if the username exists   
        const pool = await mssql.connect(sqlConfig)
        const user:UserRegistrationType[] = await (await (pool.request().input('Name',userName).execute("SpGetSpecificUser"))).recordset
        
        if(!user[0]){
            return res.status(404).json('user not found')
        }
        
        
        //password check
        const validPassword = await bycrypt.compare(password, user[0].password)
        if(!validPassword){
            return res.status(404).json('user where') 
        }
        
        //Authorization and Authentication
        const payload = user.map(property =>{
            //omit the password
            const{password,...rest} = property
            return rest
        })
        const token = jwt.sign(payload[0], process.env.SECRETKEY as string, {expiresIn:'3600000s'})
        return res.status(200).json({ message:'user logged in', token})
    } catch (error:any) {
        res.status(500).json(error.message)
    }
}
