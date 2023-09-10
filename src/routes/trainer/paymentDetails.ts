import express from "express"
import { getPaymentDetails, getTotalPamentByMonth } from "../../controllers/trainer/staffPayment"

const router = express.Router();

router.get('/totalPayments',getTotalPamentByMonth)
router.get("/paymentDetails/:month/:staff_id",getPaymentDetails)


export default router
