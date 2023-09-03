import express from "express"
import { getAllDoctors } from "../../controllers/manager/doctor";



const router = express.Router()

router.get("/", getAllDoctors);


export default router