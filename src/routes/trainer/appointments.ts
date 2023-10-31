import express from "express";
import {getAppointments} from "../../controllers/trainer/appointments";

const router =  express.Router();

router.get("/viewAppointments/:trainer_id",getAppointments);


export default router;