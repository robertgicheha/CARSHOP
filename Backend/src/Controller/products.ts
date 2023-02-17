import { RequestHandler, Request, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../config'
import {ProductType} from '../Models'
import { car } from '../Helpers'

import { DatabaseHelper } from '../DatabaseHelper'

const helperDB = new DatabaseHelper()

export const addProducts = async(req:Request, res:Response) => {

    try {
        const {model , bodyType , brand,prices,isDeleted, pictureUrl}=req.body
        const carToAdd = {carId:uid() as string, model , bodyType , brand,prices,isDeleted,pictureUrl}

        const{error}=car.validate(carToAdd)

        if(error){
            return res.status(400).json(error.details[0].message)
        }
        const result = await (await helperDB.exec('spAddCars',carToAdd)).recordset

        res.status(200).json({message:"Product added"})


    } catch (error:any) {
        res.status(500).json(error.message)
    }

}

export const getProducts = async (req:Request, res:Response) => {
      try {
        const availableCars = await (await helperDB.exec('SpGetCars')).recordset
        res.status(200).json(availableCars)
      } catch (error:any) {
        res.status(500).json(error.message)
      }
}

export const getCarsBodyShape = async (req:Request, res:Response) => {
  const bodyType = req.params.bodyType
  try {
    const carsByBody = await (await helperDB.exec('getCarByBodyShape', {BodyType:bodyType})).recordset
    res.status(200).json(carsByBody)
  } catch (error:any) {
    res.status(500).json(error.message)
  }
}
export const getCarBrand = async (req:Request, res:Response) => {
  const brandType = req.params.brand
  try {
    const carsByBody = await (await helperDB.exec('getCarByBrand', {Brand:brandType})).recordset
    res.status(200).json(carsByBody)
  } catch (error:any) {
    res.status(500).json(error.message)
  }
}
export const getOneCarProduct = async (req:Request, res:Response) => {
  const oneCar = req.params.carId
  try {
    const carsByBody = await (await helperDB.exec('getOneCar', {CarId:oneCar})).recordset
    res.status(200).json(carsByBody)
  } catch (error:any) {
    res.status(500).json(error.message)
  }
}
export const softDeleteProduct = async (req:Request, res:Response) => {
  const oneCar = req.params.carId
  try {
    const carsByBody = await (await helperDB.exec('softDeleteProduct', {CarId:oneCar})).recordset
    res.status(200).json(carsByBody)
  } catch (error:any) {
    res.status(500).json(error.message)
  }
}

