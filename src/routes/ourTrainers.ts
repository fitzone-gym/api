import express from "express"
import{
    getTrainerDetails,
    getTrainerDetailsbyID
} from "../controllers/ourTrainers";

const router = express.Router();

router.get('/', getTrainerDetails);
router.get('/:id', getTrainerDetailsbyID)

export default router