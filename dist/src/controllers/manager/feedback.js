"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackresponce = exports.searchFeedback = exports.getAllFeedbacks = void 0;
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
const getAllFeedbacks = (req, res) => {
    console.log("feedback   ");
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = 'SELECT * from feedback as f INNER JOIN users as u where f.sender_id = u.user_id';
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching attendence:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching attendence"));
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
        console.error("Error in getting feedback:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching getting feedback"));
    }
};
exports.getAllFeedbacks = getAllFeedbacks;
const searchFeedback = (req, res) => {
    try {
        const { searchTerm } = req.query; // Assuming the search term is passed as a query parameter
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = 'SELECT * from feedback as f INNER JOIN users as u where rating = ? and f.id = u.user_id;';
            const searchPattern = `${searchTerm}`; // Add wildcard for partial matching
            // Execute the query with search parameters
            connection.query(query, [searchPattern], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error searching feedback:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error searching feedback"));
                }
                // if successfully process
                res
                    .status(200)
                    .json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in search feedback:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error searching Feedback"));
    }
};
exports.searchFeedback = searchFeedback;
const feedbackresponce = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = 'INSERT INTO feedback (responce) VALUES (?) where id = request.id';
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching attendence:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching attendence"));
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
        console.error("Error in getting feedback:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching getting feedback"));
    }
};
exports.feedbackresponce = feedbackresponce;
