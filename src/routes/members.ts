import express from "express"
import { getAllMembers } from "../controllers/members";

const router = express.Router()

router.get("/", getAllMembers);

export default router