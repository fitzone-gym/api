import express from "express"
import { getPaymentDetails, getTotalPamentByMonth } from "../../controllers/trainer/staffPayment"

const router = express.Router();

router.get('/totalPayments',getTotalPamentByMonth)
router.get("/paymentDetails",getPaymentDetails)

export default router
