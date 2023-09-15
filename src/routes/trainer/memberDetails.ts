import express from "express"
import { getMemberDetails, getMemberDetailsById } from "../../controllers/trainer/memberDetails";

import {getWorkoutSchedule,createWorkoutSchedule, getExerciseList, deleteExersice} from "../../controllers/trainer/workoutSchedule";

const router = express.Router()

router.get("/", getMemberDetails);
router.get("/exercise", getExerciseList);
router.post("/schedule", createWorkoutSchedule);
router.get("/schedule/:id", getWorkoutSchedule);
router.get("/deleteSchedule/:exercise_id",deleteExersice);
router.get("/:id", getMemberDetailsById)

export default router