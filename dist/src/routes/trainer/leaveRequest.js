"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainerLeaveRequest_1 = require("../../controllers/trainer/trainerLeaveRequest");
const router = express_1.default.Router();
router.get('/getLeavesDetails/:user_id', trainerLeaveRequest_1.getLeavedetails);
router.post("/makeLeave", trainerLeaveRequest_1.makeLeaveRequest);
router.get('/getPendingLeave/:user_id', trainerLeaveRequest_1.getPending);
router.get('/getAcceptLeave/:user_id', trainerLeaveRequest_1.getAccepted);
router.get('/getRejectLeave/:user_id', trainerLeaveRequest_1.getRejected);
exports.default = router;
