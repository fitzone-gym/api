import express from "express"
import { getMemberDetails, getTrainerDetailsById } from "../../controllers/trainer/memberDetails";

import {getWorkoutSchedule,createWorkoutSchedule, getExerciseList} from "../../controllers/trainer/workoutSchedule";

const router = express.Router()

router.get("/", getMemberDetails);
router.get("/exercise", getExerciseList);
router.post("/schedule", createWorkoutSchedule);
router.get("/schedule/:id", getWorkoutSchedule);
router.get("/:id", getTrainerDetailsById)

export default router