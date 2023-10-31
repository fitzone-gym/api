import express from "express"
import { getCount } from "../../controllers/receptionist/dashboard";

const router = express.Router()

router.get("/getCount", getCount);

export default router