import express from "express"
import { getMemberDetails, getTrainerDetailsById } from "../controllers/memberDetails";

import {getWorkoutSchedule,createWorkoutSchedule, getExerciseList} from "../controllers/workoutSchedule";

const router = express.Router()

router.get("/", getMemberDetails);
router.get("/exercise", getExerciseList);
router.post("/schedule", createWorkoutSchedule);
router.get("/schedule/:id", getWorkoutSchedule);
router.get("/:id", getTrainerDetailsById)

export default router