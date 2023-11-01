"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payments_1 = require("../../controllers/member/payments");
const router = express_1.default.Router();
router.post("/intent", payments_1.getIntent);
router.post("/", payments_1.postPackageDetails);
router.get("/paymentsDetails/:user_id", payments_1.getpaymentsDetails);
exports.default = router;
