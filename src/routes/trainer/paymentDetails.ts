import express from "express"
import { getPaymentDetails, getTotalPamentByMonth } from "../../controllers/trainer/staffPayment"

const router = express.Router();

router.get('/totalPayments/:user_id',getTotalPamentByMonth)
router.get("/paymentDetails/:month/:user_id",getPaymentDetails)


export default router
