import { Router } from "express";
import { registerUser, login  } from "../Controller/authController";


const authRouter = Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',login )

export default authRouter