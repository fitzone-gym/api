"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../../controllers/doctor/dashboard");
const router = express_1.default.Router();
router.get("/", dashboard_1.getMemberAppointmentsCounts);
router.get("/todayAppointments", dashboard_1.getTodayAppointments);
router.get("/nextWeekAppointments", dashboard_1.getNextWeekAppointments);
exports.default = router;
