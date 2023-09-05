import express from "express"
import{
    getworkoutShedule,
} from "../controllers/workoutSchedule";

const router = express.Router();

router.get('/', getworkoutShedule);

export default router