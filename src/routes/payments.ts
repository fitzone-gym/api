import express from "express"
import { getstaff_payment } from "../controllers/staffpayment";

const router = express.Router()

router.get("/staff", getstaff_payment);


export default router