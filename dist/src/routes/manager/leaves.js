"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaves_1 = require("../../controllers/manager/leaves");
const router = express_1.default.Router();
router.get("/", leaves_1.leaveRequest);
router.get("/searchLeaves", leaves_1.searchLeaves);
// router.get("/apprdecLeaveRequest", apprdecLeaveRequests);
router.get("/apprleaveRequest", leaves_1.apprleaveRequest);
router.get("/decleaveRequest", leaves_1.decleaveRequest);
router.put("/:id", leaves_1.updateLeaveRequestStatus);
exports.default = router;
