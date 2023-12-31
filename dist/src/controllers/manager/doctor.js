"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorPayment = exports.addDoctor = exports.deleteDoctor = exports.getAllDoctors = void 0;
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
const getAllDoctors = (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            console.log("awa");
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const query = `SELECT d.doctor_id,u.first_name,
          u.last_name,
          u.address,
          u.email,
          u.joined_date,
          u.phone_no,
          d.doctor_type,
          d.qualification,
          u.profile_picture
        FROM users AS u
        INNER JOIN doctors AS d ON u.user_id = d.doctor_id
        WHERE u.role_id = 3;`;
            // Execute the query
            connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error("Error fetching doctor:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error fetching users"));
                }
                // if successfully process
                // console.log("Hello")
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
exports.getAllDoctors = getAllDoctors;
const deleteDoctor = (req, res) => {
    console.log("JJ");
    try {
        console.log("test");
        const doctorId = req.params.doctor_id;
        // Assuming the trainer ID is passed as a parameter in the request URL
        console.log("frm controller", doctorId);
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            // console.log("Query up")
            const deleteQuery = `
    DELETE d, u
    FROM doctors AS d
    INNER JOIN users AS u ON d.doctor_id = u.user_id
    WHERE d.doctor_id = ?;               
  `;
            // Execute the delete query with the provided trainerId
            connection.query(deleteQuery, [doctorId], (err, result) => {
                connection.release(); // Release the connection back to the pool
                if (err) {
                    console.error("Error deleting doctor:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error deleting doctor"));
                }
                // Check if at least one row was affected (trainer deleted successfully)
                if (result) {
                    res
                        .status(200)
                        .json((0, utils_1.generateResponse)(true, "Doctor deleted successfully"));
                }
                else {
                    res
                        .status(404)
                        .json((0, utils_1.generateResponse)(false, null, "Trainer not found"));
                }
            });
        });
    }
    catch (err) {
        console.error("Error in deleteDoctor:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error deleting doctor"));
    }
};
exports.deleteDoctor = deleteDoctor;
const addDoctor = (req, res) => {
    console.log("come doctor", req.body);
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
            qualification, address, message, facebook, instergram, twitter, doctor_type, } = req.body;
            const password = (0, commons_1.generateRandomString)(20);
            let date_ob = new Date();
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let joined_date = year + "-" + month + "-" + date;
            const insertQuery = `
        INSERT INTO users (first_name, last_name, phone_no, email, role_id, nic, password, joined_date, address, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, 0)
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
                joined_date,
                address,
            ], (err, result) => {
                if (err) {
                    connection.release(); // Release the connection back to the pool
                    console.error("Error adding doctor:", err);
                    return res
                        .status(500)
                        .json((0, utils_1.generateResponse)(false, null, "Error adding doctor"));
                }
                // Retrieve the user_id based on the inserted email
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
                    if (role_id == 3) {
                        const qualificationQuery = `
        INSERT INTO doctors (doctor_id,qualification,message,facebook,instergram,twitter,doctor_type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
                        connection.query(qualificationQuery, [
                            user_id,
                            qualification,
                            message,
                            facebook,
                            instergram,
                            twitter,
                            doctor_type,
                        ], (err, result) => {
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
        console.error("Error in addDoctor:", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error adding doctor"));
    }
};
exports.addDoctor = addDoctor;
const getDoctorPayment = (req, res) => { };
exports.getDoctorPayment = getDoctorPayment;
