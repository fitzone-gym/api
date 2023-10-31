import express from "express";
import { Request, Response } from "express";
import { getIntent } from "../../controllers/member/payments";


const router = express.Router();

router.post("/intent", getIntent)


export default router