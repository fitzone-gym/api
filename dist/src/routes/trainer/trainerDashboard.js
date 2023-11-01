"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainerDashboard_1 = require("../../controllers/trainer/trainerDashboard");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    res.send('dashboard');
});
router.get("/announcement", trainerDashboard_1.getAvailableNotices);
router.get("/totalMember/:user_id", trainerDashboard_1.getMemberCount);
exports.default = router;
