import express from "express"
import { getAllMembers } from "../controllers/members";
import {  getMemberProfile } from "../controllers/memberprofile";


const router = express.Router()

router.get("/getMembersDetails", getAllMembers);
router.get("/getMemberProfile",  getMemberProfile )

export default router