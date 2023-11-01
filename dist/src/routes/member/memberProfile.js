"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberprofile_1 = require("../../controllers/memberprofile");
const router = express_1.default.Router();
router.get('/profileDetails/:user_id', memberprofile_1.getMemberProfile);
router.get('/packageDetails/:user_id', memberprofile_1.getMemberPackageDetails);
router.get('/healthDetails/:user_id', memberprofile_1.getMemberHealthDetails);
router.get('/trainerDetails/:user_id', memberprofile_1.getMemberTrainerDetails);
exports.default = router;
