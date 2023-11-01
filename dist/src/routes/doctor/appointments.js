"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointments_1 = require("../../controllers/doctor/appointments");
const router = express_1.default.Router();
router.get("/", appointments_1.getMemberAppointments);
router.patch("/updateHealthDetails", appointments_1.updateHealthDetails);
exports.default = router;
