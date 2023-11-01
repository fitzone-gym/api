"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMembers = exports.getAllMembers = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const utils_1 = require("../../utils");
const db_1 = __importDefault(require("../../db"));
const pool = mysql2_1.default.createPool({
    host: db_1.default.host,
    // port:dbConfig.port,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getAllMembers = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT u.first_name, 
               u.last_name, 
               u.email,
               u.joined_date,
               u.phone_no,
               u.address,
               m.package,
               u.profile_picture,
               u.user_id,
               m.emergency_contact
       FROM users AS u
       INNER JOIN members AS m ON u.user_id = m.user_id
       WHERE u.role_id = 1;`;
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
exports.getAllMembers = getAllMembers;
const searchMembers = (req, res) => {
    try {
        const { searchTerm, searchMonth, searchYear } = req.query; // Assuming the search term is passed as a query parameter
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT u.first_name, 
                u.last_name, 
                u.email,
                u.joined_date,
                u.phone_no,
                u.address,
                m.package,
                u.profile_picture
        FROM users AS u
        INNER JOIN members AS m ON u.user_id = m.user_id
        WHERE u.role_id = 1
        AND (u.first_name LIKE ? OR u.last_name LIKE ? OR m.package LIKE ?);`;
            const searchPattern = `%${searchTerm}%`; // Add wildcard for partial matching
            const datePattern = `${searchYear}-${searchMonth}-%`;
            // Execute the query with search parameters
            connection.query(query, [searchPattern, searchPattern, searchPattern, searchPattern], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error searching members:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error searching members"));
                }
                // if successfully process
                res
                    .status(200)
                    .json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in searchMembers:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error searching members"));
    }
};
exports.searchMembers = searchMembers;
