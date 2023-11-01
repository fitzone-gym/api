"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainerProfile_1 = require("../../controllers/trainer/trainerProfile");
const router = express_1.default.Router();
router.get("/details/:user_id", trainerProfile_1.getProfileDetails);
router.get("/extraDetails/:user_id", trainerProfile_1.getExtraDetails);
exports.default = router;
