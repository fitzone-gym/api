"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayments = void 0;
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
const doctorGetQuery = `SELECT sp.payment_id as id,u.first_name ,u.last_name ,sp.payment_made_date as payment_date, sp.amount  FROM staff_payment sp INNER JOIN users u on sp.user_id = u.user_id WHERE u.role_id = 3`;
const memberGetQuery = `SELECT mp.payment_id as id,u.first_name ,u.last_name ,mp.payment_made_date as payment_date,amount  FROM member_payment mp INNER JOIN users u on mp.member_id = u.user_id `;
const trainerGetQuery = `SELECT sp.payment_id as id,u.first_name ,u.last_name ,sp.payment_made_date as payment_date, sp.amount  FROM staff_payment sp INNER JOIN users u on sp.user_id = u.user_id WHERE u.role_id = 2`;
const receptionistGetQuery = `SELECT sp.payment_id as id,u.first_name ,u.last_name ,sp.payment_made_date as payment_date, sp.amount  FROM staff_payment sp INNER JOIN users u on sp.user_id = u.user_id WHERE u.role_id = 5`;
const getPayments = (req, res) => {
    try {
        let table = getTableName(req.params.type);
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = getGetQuery(req.params.type);
            // Execute the query
            connection.query(query, (err, result) => {
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
    catch (err) {
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching payment details"));
    }
};
exports.getPayments = getPayments;
const getTableName = (type) => {
    switch (type) {
        case "doctor":
            return "doctor_payments";
        case "member":
            return "member_payments";
        default:
            return "";
    }
};
const getGetQuery = (type) => {
    switch (type) {
        case "doctors":
            return doctorGetQuery;
        case "members":
            return memberGetQuery;
        case "receptionists":
            return receptionistGetQuery;
        case "trainers":
            return trainerGetQuery;
        default:
            console.error("Invalid type provided : " + type);
            throw new Error("Invalid type provided");
    }
};
