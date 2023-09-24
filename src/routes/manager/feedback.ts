import express from "express"
import { getAllFeedbacks } from "../../controllers/manager/feedback";

const router = express.Router()

router.get("/", getAllFeedbacks);


export default router