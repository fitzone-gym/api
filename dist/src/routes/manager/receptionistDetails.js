"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receptionist_1 = require("../../controllers/manager/receptionist");
const router = express_1.default.Router();
router.get("/", receptionist_1.getAllReceptionists);
router.post("/add", receptionist_1.addReceptionist);
router.delete("/:receptionist_id", receptionist_1.deleteReceptionist);
// router.get("/payment", getReceptionistPayment);
exports.default = router;
