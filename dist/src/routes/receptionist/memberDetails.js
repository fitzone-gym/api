"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberDetails_1 = require("../../controllers/receptionist/memberDetails");
const router = express_1.default.Router();
router.get("/", memberDetails_1.getMemberDetails);
exports.default = router;
