import express from "express"
import { getAllMembers, searchMembers } from "../controllers/members";
import {  getMemberProfile } from "../controllers/memberprofile";

const router = express.Router()

router.get("/", getAllMembers);
router.get("/getMembersDetails", getAllMembers);
router.get("/getMemberProfile",  getMemberProfile )
router.get("/searchMembers", searchMembers)

export default router




