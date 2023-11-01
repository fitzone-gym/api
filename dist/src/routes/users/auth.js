"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_registration_1 = require("../../controllers/users/member_registration");
const trainer_log_in_1 = require("../../controllers/users/trainer_log_in");
const member_log_in_1 = require("../../controllers/users/member_log_in");
const router = express_1.default.Router();
router.post("/register", member_registration_1.MemberRegistration);
router.post("/login", member_log_in_1.MemberLogin);
router.post("/login/trainer", trainer_log_in_1.TrainerLogin);
router.post("/memberProfile/:user_role/:id", member_log_in_1.MemberProfile);
router.get("/memberProfile/:role_id/:id", member_log_in_1.MemberProfile);
router.patch("/updateProfile/:id", member_log_in_1.updateProfile);
exports.default = router;
