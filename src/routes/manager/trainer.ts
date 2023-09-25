import express from "express"
import { getAllTrainers, searchTrainers } from "../../controllers/manager/trainer";
import { deleteTrainer } from "../../controllers/manager/trainer";
import { addTrainer } from "../../controllers/manager/trainer";

const router = express.Router()

router.get("/", getAllTrainers);
router.delete("/:trainer_id", deleteTrainer); 
router.post("/add", addTrainer);
router.get("/searchTrainers", searchTrainers);
// router.get("/payment", getTrainerPayment);

export default router