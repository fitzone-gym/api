import express from "express";
import { getMemberDetails } from "../../controllers/doctor/members";

const router = express.Router();

router.get("/", getMemberDetails);

export default router;
