import express from "express"
import{
    getTrainerDetails,
    getTrainerDetailsbyID,
    getCurrentUserDetailsbyID
} from "../../controllers/member/ourTrainers";

const router = express.Router();

router.get('/', getTrainerDetails);
router.get('/:id', getTrainerDetailsbyID)
router.get('/currentUserDetails/:user_id', getCurrentUserDetailsbyID)

export default router