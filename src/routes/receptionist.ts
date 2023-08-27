import express from "express"
import { getTrainerDetails } from "src/controllers/receptionist";
import { getMembersDetails } from "../controllers/receptionist";
import { getAnnouncements_Receptionist } from "../controllers/announcement";

const router = express.Router()

// router.get("/", getTrainerDetails);
router.get("/", getMembersDetails);
router.get("/Announcements", getAnnouncements_Receptionist);




export default router