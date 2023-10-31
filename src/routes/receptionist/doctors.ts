import express from "express"
import { get_onCallDoctors } from "../../controllers/receptionist/doctor";

const router = express.Router()

router.get("/", get_onCallDoctors);

export default router