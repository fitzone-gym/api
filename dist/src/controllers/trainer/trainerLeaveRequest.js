"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRejected = exports.getAccepted = exports.getPending = exports.makeLeaveRequest = exports.getLeavedetails = void 0;
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
const getLeavedetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const user_id = req.params.user_id;
        // console.log(user_id);
        const query = "SELECT holidays_taken FROM leave_request WHERE user_id = ? AND Status = 2  ORDER BY leave_date DESC LIMIT 1";
        const [result] = await connection.query(query, [user_id]);
        // console.log(result);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result[0]));
    }
    catch (err) {
        console.error("Error in get leave request details", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching leave request details"));
    }
};
exports.getLeavedetails = getLeavedetails;
const makeLeaveRequest = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const fromDate = req.body.from_date;
        const toDate = req.body.to_date;
        const reason = req.body.reason;
        const holidays_taken = req.body.holidays_taken;
        const no_of_leave_dates = req.body.no_of_leave_dates;
        const no_remaining_leave_date = req.body.no_remaining_leave_date;
        const status = req.body.status;
        const connection = await pool.getConnection();
        const query = "INSERT INTO leave_request(request_date, leave_date, reason, no_of_leave_dates, holidays_taken, no_remaining_leave_date,user_id,Status) values (?,?,?,?,?,?,?,?)";
        const [result] = await connection.query(query, [fromDate, toDate, reason, no_of_leave_dates, holidays_taken, no_remaining_leave_date, user_id, status]);
        // console.log(result);
        connection.release();
        res.status(201).json((0, utils_1.generateResponse)(true, "successfully created"));
    }
    catch (err) {
        console.error("Error in make leave request", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error making leave request"));
    }
};
exports.makeLeaveRequest = makeLeaveRequest;
const getPending = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        // console.log(user_id);
        const connection = await pool.getConnection();
        const query = "SELECT * FROM leave_request where user_id = ? and Status = 1";
        const [result] = await connection.query(query, [user_id]);
        connection.release();
        // console.log(result);
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in pending request", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching pending request"));
    }
};
exports.getPending = getPending;
const getAccepted = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        // console.log(user_id);
        const connection = await pool.getConnection();
        const query = "SELECT * FROM leave_request where user_id = ? and Status = 2";
        const [result] = await connection.query(query, [user_id]);
        connection.release();
        // console.log(result);
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in accepting request", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching accept request"));
    }
};
exports.getAccepted = getAccepted;
const getRejected = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const connection = await pool.getConnection();
        const query = "SELECT * FROM leave_request where user_id = ? and Status = 0";
        const [result] = await connection.query(query, [user_id]);
        connection.release();
        // console.log(result);
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in rejecting request", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching reject request"));
    }
};
exports.getRejected = getRejected;
