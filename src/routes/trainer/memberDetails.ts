import express from "express"
import { getMemberDetails, getMemberDetailsById ,getHelthAndInjuries} from "../../controllers/trainer/memberDetails";
import {getWorkoutSchedule,createWorkoutSchedule, getExerciseList, deleteExersice} from "../../controllers/trainer/workoutSchedule";

const router = express.Router()

router.get("/exercise", getExerciseList);
router.get("/:user_id", getMemberDetails); // this user_id is trainer_id 
router.get("/memberDetails/:user_id", getMemberDetailsById)  // this user_id is member_id
router.get("/helthInjuries/:user_id",getHelthAndInjuries);
router.get("/schedule/:user_id", getWorkoutSchedule);
router.post("/schedule", createWorkoutSchedule);
router.get("/deleteSchedule/:exercise_id",deleteExersice);

export default router