"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addevent = exports.get_all_events = exports.get_current_events = void 0;
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
const get_current_events = (req, res) => {
    const announcementId = req.params.id; // Assuming you pass the announcement ID as a URL parameter
    console.log(announcementId);
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `
            SELECT * FROM events where date=MONTH(CURDATE()) `;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching events:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching events"));
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
        console.error("Error in event details:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching events"));
    }
};
exports.get_current_events = get_current_events;
const get_all_events = (req, res) => {
    const announcementId = req.params.id; // Assuming you pass the announcement ID as a URL parameter
    console.log(announcementId);
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `
            SELECT * FROM events `;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching events:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching events"));
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
        console.error("Error in getting events:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching events"));
    }
};
exports.get_all_events = get_all_events;
// adding new event
const addevent = (req, res) => {
    try {
        let reqBody = req.body;
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "INSERT INTO `events` ( `name`, `description`, 'status', `date` , `time`) " +
                "VALUES ( ?, ?, ?, ?, ?);";
            // Execute the query
            connection.query(query, [
                reqBody.name,
                reqBody.description,
                reqBody.status,
                reqBody.date,
                reqBody.time,
            ], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching Announcement", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching users"));
                }
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in creating Event:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error creating Event"));
    }
};
exports.addevent = addevent;
