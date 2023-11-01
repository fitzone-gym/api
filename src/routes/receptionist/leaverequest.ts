import express from "express"
import {
    getleaverequestDetails,
    createLeaveRequest,
  } from "../../controllers/receptionist/leaverequest";

const router = express.Router()

router.get("/", getleaverequestDetails);
router.post("/createLeaveRequest", createLeaveRequest);

export default router