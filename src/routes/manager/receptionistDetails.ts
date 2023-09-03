import express from "express"
import { getAllReceptionists } from "../../controllers/manager/receptionist";


const router = express.Router()

router.get("/", getAllReceptionists);


export default router