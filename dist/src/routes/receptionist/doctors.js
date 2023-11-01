"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_1 = require("../../controllers/receptionist/doctor");
const router = express_1.default.Router();
router.get("/", doctor_1.get_onCallDoctors);
exports.default = router;
