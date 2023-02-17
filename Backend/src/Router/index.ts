import { Router } from "express";
import { getUsers, addUsers, getSpecUser } from "../Controller/userRegistration";


 const router = Router()

router.get('',getUsers)
router.post('',addUsers)
router.get('/:id', getSpecUser)

export default router