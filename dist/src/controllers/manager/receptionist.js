"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceptionistPayment = exports.addReceptionist = exports.deleteReceptionist = exports.getAllReceptionists = exports.getMembersDetails = exports.getTrainerDetails = exports.getMemberCount = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const utils_1 = require("../../utils");
const db_1 = __importDefault(require("../../db"));
const commons_1 = require("../../utils/commons");
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
const getMemberCount = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "SELECT count(*) as workingMembers FROM members";
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
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getMemberCount:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members"));
    }
};
exports.getMemberCount = getMemberCount;
const getTrainerDetails = (req, res) => {
    console.log("a");
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                console.log("b");
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "SELECT * FROM trainers";
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching trainers:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching users"));
                }
                // if successfully process
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getrainerDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching trainers"));
    }
};
exports.getTrainerDetails = getTrainerDetails;
// Get Members Details
const getMembersDetails = (req, res) => {
    console.log("a");
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                console.log("b");
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = "SELECT * FROM members";
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching members:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching members"));
                }
                // if successfully process
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getMembersDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members"));
    }
};
exports.getMembersDetails = getMembersDetails;
//manager part
const getAllReceptionists = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            console.log("awa");
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT user_id as receptionist_id,first_name, 
                       last_name, 
                       address, 
                       email, 
                       phone_no,
                       profile_picture
                     FROM users
                    WHERE role_id = 5;`;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching receptionist:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching users"));
                }
                // if successfully process
                res.status(200).json((0, utils_1.generateResponse)(true, result));
            });
        });
    }
    catch (err) {
        console.error("Error in getdoctorDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching doctor"));
    }
};
exports.getAllReceptionists = getAllReceptionists;
//manager part
const deleteReceptionist = (req, res) => {
    // console.log("JJ")
    try {
        // console.log("test")
        const trainerId = req.params.receptionist_id;
        // Assuming the trainer ID is passed as a parameter in the request URL
        // console.log("frm controller", trainerId);
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            // console.log("Query up")
            const deleteQuery = `
              DELETE r, u
              FROM receptionists AS r
              INNER JOIN users AS u ON r.user_id = u.user_id
              WHERE u.user_id = ?;               
            `;
            // Execute the delete query with the provided trainerId
            connection.query(deleteQuery, [trainerId], (err, result) => {
                connection.release(); // Release the connection back to the pool
                if (err) {
                    console.error("Error deleting receptionist:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error deleting receptionist"));
                }
                // Check if at least one row was affected (trainer deleted successfully)
                if (result) {
                    res
                        .status(200)
                        .json((0, utils_1.generateResponse)(true, "receptionist deleted successfully"));
                }
                else {
                    res
                        .status(404)
                        .json((0, utils_1.generateResponse)(false, null, "receptionist not found"));
                }
            });
        });
    }
    catch (err) {
        console.error("Error in deleteReceptionist:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error deleting receptionist"));
    }
};
exports.deleteReceptionist = deleteReceptionist;
const addReceptionist = (req, res) => {
    // console.log("come here",req.body);
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            // Assuming the required trainer data is passed in the request body
            const { first_name, last_name, email, phone_no, role_id, nic, 
            // password,
            address, qualification, } = req.body;
            const password = (0, commons_1.generateRandomString)(20);
            let date_ob = new Date();
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let joined_date = year + "-" + month + "-" + date;
            const insertQuery = `
              INSERT INTO users (first_name, last_name, phone_no, email, role_id, nic, password, address,joined_date,status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
            `;
            // Execute the insert query with the provided data
            connection.query(insertQuery, [
                first_name,
                last_name,
                phone_no,
                email,
                role_id,
                nic,
                password,
                address,
                joined_date,
            ], (err, result) => {
                if (err) {
                    connection.release(); // Release the connection back to the pool
                    console.error("Error adding receptionist:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error adding receptionist"));
                }
                const getUserIdQuery = `
              SELECT user_id FROM users WHERE email = ?`;
                connection.query(getUserIdQuery, [email], (err, userResult) => {
                    if (err) {
                        connection.release(); // Release the connection back to the pool
                        console.error("Error retrieving user ID:", err);
                        return res
                            .status(500)
                            .json((0, utils_1.generateResponse)(false, null, "Error retrieving user ID"));
                    }
                    console.log("email eka enawa");
                    console.log("User ID retrieved:", userResult[0]?.user_id); // Print the retrieved user ID
                    const user_id = userResult[0]?.user_id;
                    if (role_id == 5) {
                        const qualificationQuery = `
            INSERT INTO receptionists (user_id,qualifications)
            VALUES (?, ?)
            `;
                        connection.query(qualificationQuery, [user_id, qualification], (err, result) => {
                            connection.release();
                            if (err) {
                                console.error("Error adding qualification:", err);
                                return res
                                    .status(500)
                                    .json((0, utils_1.generateResponse)(false, null, "Error adding qualification"));
                            }
                            (0, commons_1.mailer)(first_name, email, password)
                                .then(() => {
                                res
                                    .status(200)
                                    .json((0, utils_1.generateResponse)(true, `Trainer added successfully`));
                            })
                                .catch((err) => {
                                console.error(err);
                                res
                                    .status(500)
                                    .json((0, utils_1.generateResponse)(true, `Error while sending the email`));
                            });
                            connection.release();
                        });
                    }
                });
            });
        });
    }
    catch (err) {
        console.error("Error in addReceptionist:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error adding receptionist"));
    }
};
exports.addReceptionist = addReceptionist;
const getReceptionistPayment = (req, res) => { };
exports.getReceptionistPayment = getReceptionistPayment;
