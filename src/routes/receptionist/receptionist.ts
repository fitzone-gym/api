import express from "express"
// import { getTrainerDetails } from "../../controllers/receptionist/receptionist";
// import { getMembersDetails } from "../../controllers/receptionist/receptionist";
import { get_receptionist_Announcement } from "../../controllers/receptionist/announcements";
import { getPaymentDetails } from "../../controllers/receptionist/payment";
import { getAllTrainers } from "../../controllers/receptionist/trainers";
import {getmemberattendence, getalldaymemberattendence , searchMemberAttendence, searchAllMemberAttendence} from "../../controllers/receptionist/member_attendence";

const router = express.Router()

// router.get("/", getTrainerDetails);
// router.get("/", getMembersDetails);

router.get("/announcements", get_receptionist_Announcement)
router.get("/Payment", getPaymentDetails);
router.get("/trainerDetails", getAllTrainers)
router.get("/memberattendence", getmemberattendence)
router.get("/alldayattendence", getalldaymemberattendence)
router.get("/searchattendence", searchMemberAttendence)
router.get("/searchallattendence", searchAllMemberAttendence)



export default router