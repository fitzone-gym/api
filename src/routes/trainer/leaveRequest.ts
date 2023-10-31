import express from 'express';

import {makeLeaveRequest,getLeavedetails, getPending, getAccepted, getRejected} from "../../controllers/trainer/trainerLeaveRequest";

const router = express.Router();

router.get('/getLeavesDetails/:user_id',getLeavedetails);
router.post("/makeLeave",makeLeaveRequest);
router.get('/getPendingLeave/:user_id',getPending);
router.get('/getAcceptLeave/:user_id',getAccepted);
router.get('/getRejectLeave/:user_id',getRejected);

export default router;