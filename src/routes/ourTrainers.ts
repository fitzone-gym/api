import express from "express"
import{
    getTrainerDetails,
} from "../controllers/ourTrainers";

const router = express.Router();

router.get('/', getTrainerDetails);

export default router