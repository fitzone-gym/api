"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentDetails = void 0;
const promise_1 = __importDefault(require("mysql2/promise")); // Import the mysql2/promise library
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
const getPaymentDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT * FROM staff_payment WHERE user_id = 10002";
        // execute the query and store the result in 'result'
        const [result] = await connection.query(query); // store the data into the object
        connection.release();
        // If successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getting payment details", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching receptionist payment details"));
    }
};
exports.getPaymentDetails = getPaymentDetails;
