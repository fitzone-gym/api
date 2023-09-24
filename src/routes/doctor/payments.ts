import express from "express";
import { getpaymentDetails } from "../../controllers/doctor/payments";

const router = express.Router();

router.get("/", getpaymentDetails);


export default router;
