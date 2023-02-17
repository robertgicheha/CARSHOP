import { Router } from "express";   
import { addProducts, getProducts,getCarsBodyShape,getCarBrand,getOneCarProduct, softDeleteProduct } from "../Controller/products";
const productRoute = Router()

productRoute.post("",addProducts)
productRoute.get("/getproducts",getProducts)
productRoute.get("/getcarbodyshape/:bodyType",getCarsBodyShape)
productRoute.get("/getcarbrand/:brand",getCarBrand)
productRoute.get("/getonecar/:carId",getOneCarProduct)
productRoute.post("/softdeletecar/:carId",softDeleteProduct)

export default productRoute