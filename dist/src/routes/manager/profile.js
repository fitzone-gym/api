"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../../controllers/manager/profile");
const router = express_1.default.Router();
router.get("/:id", profile_1.getProfileDetails);
router.put("/:id", profile_1.updateProfile);
exports.default = router;
