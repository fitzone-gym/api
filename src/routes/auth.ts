import express from "express"

import{
    MemberRegistration,
} from "../controllers/member_registration";
import { MemberLogin } from "../controllers/member_log_in";

const router = express.Router()

router.post("/register", MemberRegistration);
router.post("/login", MemberLogin);
router.post("/logout", );

export default router;