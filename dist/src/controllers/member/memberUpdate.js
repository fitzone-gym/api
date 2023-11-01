"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMemberDetailsUpdate = void 0;
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
const postMemberDetailsUpdate = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const mobile_no = req.body.mobile_no;
        console.log(req.body);
        const connection = await pool.getConnection();
        const query = "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_no = ? WHERE user_id = ?";
        const [result] = await connection.query(query, [first_name, last_name, email, mobile_no, user_id]);
        connection.release();
        res.status(201).json((0, utils_1.generateResponse)(true, "successfully created"));
    }
    catch (err) {
        console.error("Error in add payment details:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.postMemberDetailsUpdate = postMemberDetailsUpdate;
