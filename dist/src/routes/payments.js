"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staffpayment_1 = require("../controllers/staffpayment");
const router = express_1.default.Router();
router.get("/staff", staffpayment_1.getstaff_payment);
exports.default = router;
