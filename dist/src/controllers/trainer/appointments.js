"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointments = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const utils_1 = require("../../utils");
const db_1 = __importDefault(require("../../db"));
const pool = promise_1.default.createPool({
    host: db_1.default.host,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getAppointments = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const trainer_id = req.params.trainer_id;
        const query = "SELECT * FROM appointments WHERE trainer_id = ? AND selectedDate >= CURDATE() ORDER BY MONTH(selectedDate)";
        const [result] = await connection.query(query, [trainer_id]);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in get appointment", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching appointments"));
    }
};
exports.getAppointments = getAppointments;
