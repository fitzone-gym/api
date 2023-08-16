import express from "express"
import { getMemberDetails, getTrainerDetailsById } from "../controllers/memberDetails";

import {getWorkoutSchedule} from "../controllers/workoutSchedule";

const router = express.Router()

router.get("/", getMemberDetails);
router.get("/:id", getTrainerDetailsById)
router.get("/schedule", getWorkoutSchedule);

export default router