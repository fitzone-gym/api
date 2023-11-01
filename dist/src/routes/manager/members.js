"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const members_1 = require("../../controllers/manager/members");
// import { getMemberProfile } from "../../controllers/manager/memberprofile";
const router = express_1.default.Router();
router.get("/", members_1.getAllMembers);
router.get("/getMembersDetails", members_1.getAllMembers);
// router.get("/getMemberProfile",  getMemberProfile )
router.get("/searchMembers", members_1.searchMembers);
// router.get("/payment", getMemberPayment);
exports.default = router;
