"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUp = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const utils_1 = require("../utils");
const db_1 = __importDefault(require("../db"));
const pool = mysql2_1.default.createPool({
    host: db_1.default.host,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const startUp = (req, res) => {
    console.log("Welcome to FitZone");
    return res
        .status(200)
        .json((0, utils_1.generateResponse)(true, "welcome to FitZone"));
};
exports.startUp = startUp;
