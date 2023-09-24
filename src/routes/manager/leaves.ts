import express from "express"
import { apprleaveRequest, decleaveRequest, leaveRequest, searchLeaves, updateLeaveRequestStatus } from "../../controllers/manager/leaves";

const router = express.Router()

router.get("/", leaveRequest);
router.get("/searchLeaves", searchLeaves);
// router.get("/apprdecLeaveRequest", apprdecLeaveRequests);
router.get("/apprleaveRequest", apprleaveRequest);
router.get("/decleaveRequest", decleaveRequest);
router.put('/leaves/:id', updateLeaveRequestStatus);

export default router