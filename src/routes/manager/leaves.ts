import express from "express"
import { apprleaveRequest, decleaveRequest, leaveRequest, searchLeaves } from "../../controllers/manager/leaves";

const router = express.Router()

router.get("/", leaveRequest);
router.get("/searchLeaves", searchLeaves);
// router.get("/apprdecLeaveRequest", apprdecLeaveRequests);
router.get("/apprleaveRequest", apprleaveRequest);
router.get("/decleaveRequest", decleaveRequest);


export default router