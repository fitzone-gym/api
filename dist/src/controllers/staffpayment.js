"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getstaff_payment = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const utils_1 = require("../utils");
const pool = mysql2_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fit_zone",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getstaff_payment = (req, res) => {
    console.log("Staff Paymet");
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT * FROM staff_payment  WHERE user_id = 5 `;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching members:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching users"));
                }
                // if successfully process
                // console.log("Hello")
                res
                    .status(200)
                    .json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getmembersDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members"));
    }
};
exports.getstaff_payment = getstaff_payment;
