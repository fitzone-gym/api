import express from "express"

import{
    MemberRegistration,
} from "../controllers/member_registration";

const router = express.Router()

router.post("/", MemberRegistration);

export default router;