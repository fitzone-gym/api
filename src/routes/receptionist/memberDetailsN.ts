import express from "express"
import { getMemberDetailsN } from "../../controllers/receptionist/memberDetailsN";

const router = express.Router()

router.get("/", getMemberDetailsN);

export default router