import express from "express"
import { getAllDoctors } from "../../controllers/manager/doctor";



const router = express.Router()

router.get("/", getAllDoctors);
router.delete("/:_id", deleteDoctor);

export default router