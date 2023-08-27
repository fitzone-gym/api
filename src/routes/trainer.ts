import express from "express"
import { getAllTrainers, searchTrainers } from "../controllers/trainer";
import { deleteTrainer } from "../controllers/trainer";
import { addTrainer } from "../controllers/trainer";

const router = express.Router()

router.get("/", getAllTrainers);
router.delete("/:trainer_id", deleteTrainer); 
router.post("/add", addTrainer);
router.get("/searchTrainers", searchTrainers)

export default router