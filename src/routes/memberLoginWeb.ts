import express from "express";
import { MemberLogin } from "../controllers/memberLoginWeb";

const router = express.Router();

router.post("/", MemberLogin);
export default router;
