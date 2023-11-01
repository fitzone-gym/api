"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTrainers = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const utils_1 = require("../../utils");
const db_1 = __importDefault(require("../../db"));
const pool = mysql2_1.default.createPool({
    host: db_1.default.host,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getAllTrainers = (req, res) => {
    try {
        console.log("Hello");
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT u.first_name, 
      u.last_name, 
      u.nic,
      t.working_experience, 
      u.email, 
      u.phone_no,
      u.status, 
      t.trainer_id
      FROM users as u
      INNER JOIN 
      trainers as t ON u.user_id = t.user_id 
      WHERE u.role_id = 2  `;
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
exports.getAllTrainers = getAllTrainers;
