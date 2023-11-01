"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfileDetails = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const utils_1 = require("../../utils");
const db_1 = __importDefault(require("../../db"));
const pool = mysql2_1.default.createPool({
    host: db_1.default.host,
    // port: dbConfig.port,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getProfileDetails = (req, res) => {
    try {
        let user_id = req.params.id;
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "SELECT user_id,first_name,last_name,email,nic,DOB,phone_no,profile_picture,address FROM users WHERE user_id = ?";
            // Execute the query
            connection.query(query, [user_id], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching payments:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching payment details"));
                }
                // if successfully process
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) { }
};
exports.getProfileDetails = getProfileDetails;
const updateProfile = (req, res) => {
    try {
        let user_id = req.params.id, first_name = req.body.first_name, last_name = req.body.last_name, email = req.body.email, nic = req.body.nic, DOB = req.body.DOB, phone_no = req.body.phone_no, address = req.body.address;
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "Update users SET first_name = ?, last_name = ?, email = ?, nic = ?, DOB = ?, phone_no = ?, address = ? FROM users WHERE user_id = ?";
            // Execute the query
            connection.query(query, [first_name, last_name, email, nic, DOB, phone_no, address, user_id], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching payments:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching payment details"));
                }
                // if successfully process
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) { }
};
exports.updateProfile = updateProfile;
