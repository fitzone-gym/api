import express from "express"
import { getMemberCount } from "../controllers/members";

const router = express.Router()

router.get("/", getMemberCount);

export default router