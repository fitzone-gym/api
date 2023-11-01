"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelthAndInjuries = exports.getMemberDetailsById = exports.getMemberDetails = void 0;
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
        // need to set the session Id 
        const query = "SELECT u.user_id, u.first_name, u.last_name, u.profile_picture FROM users u INNER JOIN members m ON u.user_id = m.user_id WHERE u.role_id = 1 AND m.trainer_id = ?";
        // execute the query and store the result in 'result'
        const [result] = await connection.query(query, [req.params.user_id]); // store the data into the object
        connection.release();
        // If successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
        console.log(result);
    }
    catch (err) {
        console.error("Error in getMemberDetails", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching member details"));
    }
};
exports.getMemberDetails = getMemberDetails;
const getMemberDetailsById = async (req, res) => {
    try {
        // console.log(req.params.user_id)
        const connection = await pool.getConnection();
        const query = "SELECT first_name, last_name, profile_picture, dob, email, phone_no, gender from users WHERE user_id = ?";
        // execute the query and store the result in 'result'
        const [result] = await connection.query(query, [req.params.user_id]); // store the data into the object
        // console.log(result[0]);
        const dob = new Date(result[0].dob);
        const diff = new Date(Date.now() - dob.getTime());
        const age = diff.getUTCFullYear() - 1970;
        connection.release();
        // If successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, {
            ...result[0],
            age
        }));
        console.log(result);
    }
    catch (err) {
        console.error("Error in getMemberDetails", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching member details"));
    }
};
exports.getMemberDetailsById = getMemberDetailsById;
const getHelthAndInjuries = async (req, res) => {
    console.log("entered");
    try {
        console.log(req.params.user_id);
        const Connection = await pool.getConnection();
        const query = "SELECT * from members WHERE user_id = ?";
        const [result] = await Connection.query(query, [req.params.user_id]);
        Connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
        console.log(result);
    }
    catch (err) {
        console.error("Error in getHelthAndInjuries", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching helth and injuries"));
    }
};
exports.getHelthAndInjuries = getHelthAndInjuries;
