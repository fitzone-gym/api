"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainer_1 = require("../../controllers/manager/trainer");
const trainer_2 = require("../../controllers/manager/trainer");
const trainer_3 = require("../../controllers/manager/trainer");
const router = express_1.default.Router();
router.get("/", trainer_1.getAllTrainers);
router.delete("/:trainer_id", trainer_2.deleteTrainer);
router.post("/add", trainer_3.addTrainer);
router.get("/searchTrainers", trainer_1.searchTrainers);
// router.get("/payment", getTrainerPayment);
exports.default = router;
