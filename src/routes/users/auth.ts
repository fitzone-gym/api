import express from "express"

import{
    MemberRegistration,
} from "../../controllers/users/member_registration";
import { MemberLogin, MemberProfile , updateProfile} from "../../controllers/users/member_log_in";
import { TrainerLogin } from "../../controllers/users/trainer_log_in";


const router = express.Router()

router.post("/register", MemberRegistration);
router.post("/login", MemberLogin);
router.post("/login/trainer", TrainerLogin);
router.post("/memberProfile/:user_role/:id", MemberProfile);
router.get("/memberProfile/:role_id/:id", MemberProfile);
router.patch("/updateProfile/:id", updateProfile);

export default router;