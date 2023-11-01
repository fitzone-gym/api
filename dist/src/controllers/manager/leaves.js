"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLeaves = exports.decleaveRequest = exports.apprleaveRequest = exports.updateLeaveRequestStatus = exports.leaveRequest = void 0;
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
const leaveRequest = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT leave_request_id,u.first_name, 
                 u.last_name, 
                 u.email,
                 l.reason,
                 l.leave_date,
                 l.request_date, 
                 l.no_of_leave_dates,
                 l.no_remaining_leave_date
               FROM users AS u
               INNER JOIN leave_request AS l ON u.user_id = l.user_id
               WHERE u.role_id = 2 AND l.status = 1;`;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching leaves:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching"));
                }
                // if successfully process
                // console.log("Hello")
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getleavesDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching leaves"));
    }
};
exports.leaveRequest = leaveRequest;
const updateLeaveRequestStatus = (req, res) => {
    const leaves_request_id = req.params.id;
    const newStatus = req.body.status;
    // Update the leave request status in your database
    try {
        const updateQuery = "UPDATE leave_request SET status = ? WHERE leave_request_id = ?";
        pool.query(updateQuery, [newStatus, leaves_request_id], (error, results) => {
            if (error) {
                console.error("Error updating leave request status:", error);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Error updating leave request status"));
            }
            res
                .status(200)
                .json((0, utils_1.generateResponse)(true, "Leave request status updated successfully"));
        });
    }
    catch (error) {
        console.error("Error updating leave request status:", error);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error updating leave request status"));
    }
};
exports.updateLeaveRequestStatus = updateLeaveRequestStatus;
//   export const apprdecLeaveRequests = (req: Request, res: Response) => {
//     console.log(req.query.status);
//     try {
//       pool.getConnection((err, connection) => {
//         if (err) {
//           console.error("Error connecting to the database:", err);
//           return res.status(500).json(generateResponse(false, null, "Database connection error"));
//         }
//         const statusValue = req.query.status; // Get the status value from the request
//         const query = `
//           SELECT u.first_name,
//                  u.last_name,
//                  u.email,
//                  l.reason,
//                  l.leave_date,
//                  l.request_date,
//                  l.no_remaining_leave_date,
//                  CASE
//                      WHEN l.status = 0 THEN 'decline'
//                      WHEN l.status = 2 THEN 'approve'
//                      ELSE 'unknown' -- Handle other status values if needed
//                  END AS status
//           FROM users AS u
//           INNER JOIN leave_request AS l ON u.user_id = l.user_id
//           WHERE u.role_id = 2 AND l.status = ?;`;
//         // Use prepared statements to safely inject statusValue
//         connection.query(query, [statusValue], (err, result) => {
//           // Release the connection back to the pool
//           connection.release();
//           if (err) {
//             console.error("Error fetching leaves:", err);
//             return res.status(500).json(generateResponse(false, null, "Error fetching"));
//           }
//           // If successfully processed
//           res.status(200).json(generateResponse(true, result));
//         });
//       });
//     } catch (err) {
//       console.error("Error in apprdecLeaveRequests:", err);
//       res.status(500).json(generateResponse(false, null, "Error fetching leaves"));
//     }
//   };
const apprleaveRequest = (req, res) => {
    console.log("approve1");
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `
                SELECT u.first_name, 
                       u.last_name, 
                       u.email,
                       l.reason,
                       l.leave_date,
                       l.request_date, 
                       l.no_remaining_leave_date,
                       l.no_of_leave_dates,
                       CASE
                       WHEN l.status = 0 THEN 'decline'
                       WHEN l.status = 2 THEN 'approve'
                           ELSE 'unknown' -- Handle other status values if needed
                       END AS status
                FROM users AS u
                INNER JOIN leave_request AS l ON u.user_id = l.user_id
                WHERE u.role_id = 2 AND l.status = 2;`;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching leaves:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching"));
                }
                // if successfully process
                // console.log("Hello")
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getleavesDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching leaves"));
    }
};
exports.apprleaveRequest = apprleaveRequest;
const decleaveRequest = (req, res) => {
    console.log("decline1");
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `
                SELECT u.first_name, 
                       u.last_name, 
                       u.email,
                       l.reason,
                       l.leave_date,
                       l.request_date, 
                       l.no_remaining_leave_date,
                       l.no_of_leave_dates,
                       CASE
                           WHEN l.status = 0 THEN 'decline'
                           WHEN l.status = 2 THEN 'approve'
                           ELSE 'unknown' -- Handle other status values if needed
                       END AS status
                FROM users AS u
                INNER JOIN leave_request AS l ON u.user_id = l.user_id
                WHERE u.role_id = 2 AND l.status = 0;`;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching leaves:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching"));
                }
                // if successfully process
                // console.log("Hello")
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getleavesDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching leaves"));
    }
};
exports.decleaveRequest = decleaveRequest;
const searchLeaves = (req, res) => {
    try {
        const searchTerm = req.query.searchTerm; // Get the search term from the query parameters
        // Create the SQL query to search for trainers by name
        const query = `
      SELECT u.first_name, 
      u.last_name, 
      u.email,
      l.reason,
      l.leave_date,
      l.request_date, 
      l.no_remaining_leave_date
        FROM users AS u
        INNER JOIN leave_request AS l ON u.user_id = l.user_id
        WHERE u.role_id = 2
        AND (u.first_name LIKE ? OR u.last_name LIKE ? OR CONCAT(u.first_name, ' ', u.last_name) LIKE ? OR l.reason LIKE ?);`;
        const searchTermWithWildcards = `%${searchTerm}%`; // Add wildcards for searching
        // Execute the query with the search term
        pool.query(query, [
            searchTermWithWildcards,
            searchTermWithWildcards,
            searchTermWithWildcards,
            searchTermWithWildcards,
        ], (err, result) => {
            if (err) {
                console.error("Error searching for leave requests:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Error searching for leave requests"));
            }
            res.status(200).json((0, utils_1.generateResponse)(true, result));
        });
    }
    catch (err) {
        console.error("Error in searchLeavesByName:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error searching for leave requests"));
    }
};
exports.searchLeaves = searchLeaves;
