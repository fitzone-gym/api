"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeaveRequest = exports.getleaverequestDetails = void 0;
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
const getleaverequestDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT * FROM doctor_leave_requests ORDER BY acceptance_status, requested_date ";
        // Execute the query and store the result in 'result'
        const [result] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getleaverequestDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching leaverequestDetails details"));
    }
};
exports.getleaverequestDetails = getleaverequestDetails;
const createLeaveRequest = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const { fromDate, toDate, reason } = req.body;
        console.log(req.body);
        const fromDateN = new Date(fromDate);
        const toDateN = new Date(toDate);
        console.log(fromDateN, toDateN, reason);
        const query = "INSERT INTO doctor_leave_requests (requested_date, from_date, to_date, reason, acceptance_status) values (?,?,?,?,0)";
        const [result] = await connection.query(query, [
            currentDate,
            fromDateN,
            toDateN,
            reason,
        ]);
        connection.release(); // Release the connection back to the pool
        // Access the insertId from the result
        const insertedId = result.insertId;
        // Send a success response
        res.status(200).json({
            message: "Data inserted successfully",
            insertedId,
        });
    }
    catch (err) {
        console.error("Error in inserting data:", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error inserting data"));
    }
};
exports.createLeaveRequest = createLeaveRequest;
