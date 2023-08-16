import express from "express"
import { getAllTrainers } from "../controllers/trainers";

const router = express.Router()

router.get("/getTrainerDetails", getAllTrainers);

export default router