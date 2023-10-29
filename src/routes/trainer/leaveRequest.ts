import express from 'express';

import {makeLeaveRequest} from "../../controllers/trainer/trainerLeaveRequest";

const router = express.Router();

router.post("/makeLeave",makeLeaveRequest);

export default router;