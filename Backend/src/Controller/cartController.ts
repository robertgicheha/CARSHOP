import {  Request, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../config'
import {ProductType} from '../Models'
import { cartSchema } from '../Helpers'


import { DatabaseHelper } from '../DatabaseHelper'

const helperDB = new DatabaseHelper()

export const addProductsToCart = async(req:Request, res:Response) => {

    try {
        const cardID = uid()
        const {carBrand,carId,prices,quantity}=req.body
        const carToAdd = {cardID:uid() as string ,carBrand,userId:req.body.user.userId,carId,prices,quantity}
        const{error}=cartSchema.validate(carToAdd)

        if(error){
            return res.status(400).json(error.details[0].message)
        }
        const result = await (await helperDB.exec('spAddToCart',carToAdd)).recordset

        res.status(200).json({message:"Product added"})


    } catch (error:any) {
        res.status(500).json(error.message)
    }

}
export const subtractProducts = async(req:Request, res:Response) => {

    try {
        const addTyp = req.params.cardID
        const result = await (await helperDB.exec('SubtractCar',{CardID:addTyp})).recordset
        res.status(200).json(result)
    } catch (error:any) {
        res.status(500).json(error.message)
    }

}
export const addProducts = async(req:Request, res:Response) => {

    try {
        const addTyp = req.params.cardID
        const result = await (await helperDB.exec('AddCar',{CardID:addTyp})).recordset
        res.status(200).json(result)
    } catch (error:any) {
        res.status(500).json(error.message)
    }

}





  
  