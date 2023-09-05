import express from "express"
// import { getTrainerDetails } from "../../controllers/receptionist/receptionist";
// import { getMembersDetails } from "../../controllers/receptionist/receptionist";
import { getAnnouncements_Receptionist } from "../../controllers/manager/announcement";

const router = express.Router()

// router.get("/", getTrainerDetails);
// router.get("/", getMembersDetails);
router.get("/Announcements", getAnnouncements_Receptionist);




export default router