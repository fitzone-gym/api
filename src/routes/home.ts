import express from "express"
import { startUp } from "../controllers/home";

const router = express.Router()

router.get("/", startUp);

export default router