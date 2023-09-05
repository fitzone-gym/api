import express from "express"
import { deleteDoctor, getAllDoctors } from "../controllers/doctor";



const router = express.Router()

router.get("/", getAllDoctors);
router.delete("/:_id", deleteDoctor);

export default router