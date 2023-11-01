"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedback_1 = require("../../controllers/manager/feedback");
const feedback_2 = require("../../controllers/manager/feedback");
const router = express_1.default.Router();
router.get("/", feedback_1.getAllFeedbacks);
router.get('/searchfeedback', feedback_2.searchFeedback);
exports.default = router;
