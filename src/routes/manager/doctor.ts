import express from "express"
import { addDoctor, deleteDoctor, getAllDoctors } from "../../controllers/manager/doctor";



const router = express.Router()

router.get("/", getAllDoctors);
router.post("/add", addDoctor);
router.delete("/:doctor_id", deleteDoctor);

export default router