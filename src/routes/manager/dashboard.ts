import express from "express";
import { getDashboardDetails } from "../../controllers/manager/dashboard";

const router = express.Router();

router.get("/", getDashboardDetails);

export default router;