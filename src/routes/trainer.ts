import express from "express"
import { getAllTrainers } from "../controllers/trainer";
import { deleteTrainer } from "../controllers/trainer";
import { addTrainer } from "../controllers/trainer";

const router = express.Router()

router.get("/", getAllTrainers);
router.delete("/:trainer_id", deleteTrainer); 
router.post("/add", addTrainer);

export default router