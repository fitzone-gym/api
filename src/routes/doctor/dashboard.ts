import express from "express";
import {
  getMemberAppointmentsCounts,
  getTodayAppointments,
  getNextWeekAppointments
} from "../../controllers/doctor/dashboard";

const router = express.Router();

router.get("/", getMemberAppointmentsCounts);
router.get("/todayAppointments", getTodayAppointments);
router.get("/nextWeekAppointments", getNextWeekAppointments);

export default router;
