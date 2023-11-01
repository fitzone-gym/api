"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = require("../../controllers/receptionist/events");
const events_2 = require("../../controllers/receptionist/events");
const events_3 = require("../../controllers/receptionist/events");
const router = express_1.default.Router();
router.get("/", events_1.get_all_events);
router.get("/currentevents", events_2.get_current_events);
router.get("/addevent", events_3.addevent);
exports.default = router;
