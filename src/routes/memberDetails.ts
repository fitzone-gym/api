import express from "express"
import { getMemberDetails } from "../controllers/memberDetails";

const router = express.Router()

router.get("/", getMemberDetails);


export default router