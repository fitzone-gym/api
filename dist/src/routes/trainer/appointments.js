"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointments_1 = require("../../controllers/trainer/appointments");
const router = express_1.default.Router();
router.get("/viewAppointments/:trainer_id", appointments_1.getAppointments);
exports.default = router;
