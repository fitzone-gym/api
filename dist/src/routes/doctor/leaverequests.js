"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaverequests_1 = require("../../controllers/doctor/leaverequests");
const router = express_1.default.Router();
router.get("/", leaverequests_1.getleaverequestDetails);
router.post("/createLeaveRequest", leaverequests_1.createLeaveRequest);
exports.default = router;
