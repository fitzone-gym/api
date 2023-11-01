"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_1 = require("../../controllers/manager/doctor");
const router = express_1.default.Router();
router.get("/", doctor_1.getAllDoctors);
router.post("/add", doctor_1.addDoctor);
router.delete("/:doctor_id", doctor_1.deleteDoctor);
// router.get("/payment", getDoctorPayment);
exports.default = router;
