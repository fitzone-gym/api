"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMembercheckout = exports.addMemberattendence = exports.getalldaymemberattendence = exports.searchAllMemberAttendence = exports.searchMemberAttendence = exports.getmemberattendence = void 0;
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
const getmemberattendence = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id WHERE Date = CURRENT_DATE;`;
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
        console.error("Error in getting member attendence:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching getting member attendence details"));
    }
};
exports.getmemberattendence = getmemberattendence;
const searchMemberAttendence = (req, res) => {
    try {
        const { searchTerm } = req.query; // Assuming the search term is passed as a query parameter
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id WHERE Date = CURRENT_DATE
          AND (u.first_name LIKE ? OR u.last_name LIKE ?);`;
            const searchPattern = `%${searchTerm}%`; // Add wildcard for partial matching
            // Execute the query with search parameters
            connection.query(query, [searchPattern, searchPattern, searchPattern], (err, result) => {
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
exports.searchMemberAttendence = searchMemberAttendence;
const searchAllMemberAttendence = (req, res) => {
    try {
        const { searchTerm } = req.query; // Assuming the search term is passed as a query parameter
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id WHERE Date = CURRENT_DATE
          AND (u.first_name LIKE ? OR u.last_name LIKE ?);`;
            const searchPattern = `%${searchTerm}%`; // Add wildcard for partial matching
            // Execute the query with search parameters
            connection.query(query, [searchPattern, searchPattern, searchPattern], (err, result) => {
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
exports.searchAllMemberAttendence = searchAllMemberAttendence;
const getalldaymemberattendence = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id;`;
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
        console.error("Error in getting member attendence:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching getting member attendence details"));
    }
};
exports.getalldaymemberattendence = getalldaymemberattendence;
const addMemberattendence = (req, res) => {
    try {
        let reqBody = req.body;
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "INSERT INTO member_attendence('member_id','Checkin') VALUES (?, ?)";
            // Execute the query
            connection.query(query, [reqBody.member_id, reqBody.Checkin], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching attendence:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching attendence"));
                }
            });
        });
    }
    catch (err) {
        console.error("Error in adding member attendence:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching getting member attendence details"));
    }
};
exports.addMemberattendence = addMemberattendence;
const addMembercheckout = (req, res) => {
    try {
        let reqBody = req.body;
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "UPDATE member_attendence SET('Checkout') VALUES (?) where member_id = ?";
            // Execute the query
            connection.query(query, [reqBody.checkout, reqBody.member_id], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching attendence:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching attendence"));
                }
            });
        });
    }
    catch (err) {
        console.error("Error in adding member attendence:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching getting member attendence details"));
    }
};
exports.addMembercheckout = addMembercheckout;
