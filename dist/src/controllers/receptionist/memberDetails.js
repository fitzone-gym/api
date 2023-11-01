"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleMemberDetails = exports.getMemberDetails = void 0;
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
const getMemberDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT * FROM users INNER JOIN members ON users.user_id = members.user_id WHERE users.role_id = 1";
        // execute the query and store the result in 'result'
        const [result] = await connection.query(query); // store the data into the object
        connection.release();
        // If successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getMemberDetails", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching member details"));
    }
};
exports.getMemberDetails = getMemberDetails;
const getSingleMemberDetails = async (req, res) => {
    try {
        const memberId = req.params.id; // Get the member ID from the request parameters
        // Validate that memberId is provided and is a number
        if (!memberId || isNaN(Number(memberId))) {
            return res.status(400).json((0, utils_1.generateResponse)(false, null, "Invalid member ID"));
        }
        const connection = await pool.getConnection();
        const query = "SELECT * FROM users INNER JOIN members ON users.user_id = members.user_id WHERE users.user_id = ? AND users.role_id = ";
        const [result] = await connection.query(query, [memberId]);
        connection.release();
        if (result.length === 0) {
            return res.status(404).json((0, utils_1.generateResponse)(false, null, "Member not found"));
        }
        res.status(200).json((0, utils_1.generateResponse)(true, result[0])); // Return the first (and only) row of the result
    }
    catch (err) {
        console.error("Error in getSingleMemberDetails", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching member details"));
    }
};
exports.getSingleMemberDetails = getSingleMemberDetails;
