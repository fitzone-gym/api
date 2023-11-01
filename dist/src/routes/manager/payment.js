"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = require("../../controllers/manager/payment");
const router = express_1.default.Router();
router.get("/:type", payment_1.getPayments);
exports.default = router;
