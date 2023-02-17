
import express, { json } from "express"
import router from './Router'
import authRouter from "./Router/authRoute"
import productRoute from "./Router/product.router"
import cartRoute from "./Router/cartRouter"

const app = express()

//registering some middlewares
app.use(json()) //adds a body to the request

app.use('/users',router)
app.use('/auth', authRouter)
app.use("/products",productRoute)
app.use('/cart',cartRoute)

const port =process.env.PORT || 4000

app.get('/home',(req,res)=>{
    res.send("testing postman")
})

app.listen(port,()=>{
    console.log("server running")
})