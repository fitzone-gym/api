import express from "express";
import { getPayments } from "../../controllers/manager/payment";

const router = express.Router();

router.get("/:type", getPayments);

export default router;
