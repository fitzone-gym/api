import express from "express"
import { getAllTrainers } from "src/controllers/receptionist";
import { getMembersDetails } from "../controllers/receptionist";
import { getAnnouncements_Receptionist } from "../controllers/announcement";

const router = express.Router()

router.get("/", getAllTrainers);
router.get("/memberDetails", getMembersDetails);
router.get("/Announcements", getAnnouncements_Receptionist);




export default router