import express from "express";
import {
  getMemberAppointments,
  updateHealthDetails,
} from "../../controllers/doctor/appointments";

const router = express.Router();

router.get("/", getMemberAppointments);
router.patch("/updateHealthDetails", updateHealthDetails);

export default router;
