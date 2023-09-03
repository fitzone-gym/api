import express from "express"

import{
    MemberRegistration,
} from "../../controllers/users/member_registration";
import { MemberLogin, MemberProfile } from "../../controllers/users/member_log_in";

const router = express.Router()

router.post("/register", MemberRegistration);
router.post("/login", MemberLogin);
router.post("/login", MemberLogin);
router.post("/memberProfile/:user_role/:id", MemberProfile);

export default router;