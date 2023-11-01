"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dietPlan_1 = require("../../controllers/member/dietPlan");
const router = express_1.default.Router();
router.get('/:id', dietPlan_1.getMemberDetails);
exports.default = router;
