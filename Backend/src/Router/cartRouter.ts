import { Router } from "express";   
import {addProductsToCart, subtractProducts, addProducts} from '../Controller/cartController'
import { verifyToken } from "../Middlewares/verifyToken";

const cartRoute = Router()

cartRoute.post("",verifyToken, addProductsToCart)
cartRoute.post("/subtract/:cardID",verifyToken, subtractProducts)
cartRoute.post("/add/:cardID",verifyToken, addProducts)

export default cartRoute