"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberDetails_1 = require("../../controllers/trainer/memberDetails");
const workoutSchedule_1 = require("../../controllers/trainer/workoutSchedule");
const router = express_1.default.Router();
router.get("/exercise", workoutSchedule_1.getExerciseList);
router.get("/:user_id", memberDetails_1.getMemberDetails); // this user_id is trainer_id 
router.get("/memberDetails/:user_id", memberDetails_1.getMemberDetailsById); // this user_id is member_id
router.get("/helthInjuries/:user_id", memberDetails_1.getHelthAndInjuries);
router.get("/schedule/:user_id", workoutSchedule_1.getWorkoutSchedule);
router.post("/schedule", workoutSchedule_1.createWorkoutSchedule);
router.delete("/deleteSchedule/:deleteId", workoutSchedule_1.deleteExersice);
exports.default = router;
