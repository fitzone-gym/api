"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ourTrainers_1 = require("../../controllers/member/ourTrainers");
const router = express_1.default.Router();
router.get('/', ourTrainers_1.getTrainerDetails);
router.get('/:id', ourTrainers_1.getTrainerDetailsbyID);
router.get('/currentUserDetails/:user_id', ourTrainers_1.getCurrentUserDetailsbyID);
exports.default = router;
