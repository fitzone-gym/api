"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staffPayment_1 = require("../../controllers/trainer/staffPayment");
const router = express_1.default.Router();
router.get('/totalPayments/:user_id', staffPayment_1.getTotalPamentByMonth);
router.get("/paymentDetails/:month/:user_id", staffPayment_1.getPaymentDetails);
exports.default = router;
