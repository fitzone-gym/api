import express from "express"
import { getAllFeedbacks } from "../../controllers/manager/feedback";
import { searchFeedback } from '../../controllers/manager/feedback';

const router = express.Router()

router.get("/", getAllFeedbacks);
router.get('/searchfeedback', searchFeedback);


export default router