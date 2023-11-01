"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const landingPage_1 = require("../../controllers/users/landingPage");
const router = express_1.default.Router();
router.get("/", landingPage_1.getCountsForCounterSection);
router.get("/getTrainerDetails", landingPage_1.getTrainerDetails);
router.get("/getUserFeedbacksForTestimonial", landingPage_1.getUserFeedbacksForTestimonial);
router.post("/contactUsFormSubmition", landingPage_1.contactUsFormSubmition);
exports.default = router;
