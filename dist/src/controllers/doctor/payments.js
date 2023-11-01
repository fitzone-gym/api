"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getpaymentDetails = void 0;
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
const getpaymentDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT * FROM doctor_payments WHERE payment_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)";
        // Execute the query and store the result in 'result'
        const [result] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getpaymentDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching payment details"));
    }
};
exports.getpaymentDetails = getpaymentDetails;
