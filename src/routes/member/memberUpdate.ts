import express from "express";
import { postMemberDetailsUpdate } from "../../controllers/member/memberUpdate";

const router = express.Router();

router.patch("/", postMemberDetailsUpdate)


export default router