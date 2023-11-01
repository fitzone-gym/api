"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getworkoutShedule = void 0;
const promise_1 = __importDefault(require("mysql2/promise")); // Import the mysql2/promise library
const utils_1 = require("../utils");
const db_1 = __importDefault(require("../db"));
const pool = promise_1.default.createPool({
    host: db_1.default.host,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getworkoutShedule = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT exercise_name, sets, reps,exercise_id FROM workout_schedule WHERE member_id =10001";
        const [result] = await connection.query(query);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in get Trainer details:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.getworkoutShedule = getworkoutShedule;
