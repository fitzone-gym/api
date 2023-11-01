import express from "express"
import { getAllMembers, searchMembers } from "../../controllers/manager/members";
// import { getMemberProfile } from "../../controllers/manager/memberprofile";

const router = express.Router()

router.get("/", getAllMembers);
router.get("/getMembersDetails", getAllMembers);
// router.get("/getMemberProfile",  getMemberProfile )
router.get("/searchMembers", searchMembers);
// router.get("/payment", getMemberPayment);

export default router




