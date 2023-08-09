import express from "express"

import{
    MemberRegistration,
} from "../controllers/member_registration";

const router = express.Router()

router.get("/", MemberRegistration);

export default router;