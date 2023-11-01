import express from "express";
import { Request, Response } from "express";
import { getIntent, postPackageDetails, getpaymentsDetails } from "../../controllers/member/payments";


const router = express.Router();

router.post("/intent", getIntent)
router.post("/", postPackageDetails)
router.get("/paymentsDetails/:user_id", getpaymentsDetails)


export default router