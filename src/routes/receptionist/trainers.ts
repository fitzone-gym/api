import express from "express"
import { getAllTrainers } from "../../controllers/receptionist/trainers";

const router = express.Router()

router.get("/getTrainerDetails", getAllTrainers);

export default router