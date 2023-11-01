"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHealthDetails = exports.getMemberAppointments = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const utils_1 = require("../../utils");
const db_1 = __importDefault(require("../../db"));
const pool = promise_1.default.createPool({
    host: db_1.default.host,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getMemberAppointments = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT users.first_name, users.last_name, users.email, users.dob, DATE(DATE_FORMAT(joined_date, '%Y-%m-%d')) AS joined_date_formatted,users.profile_picture,members.*,member_doctor_appointments.* FROM users INNER JOIN members ON members.user_id = users.user_id INNER JOIN member_doctor_appointments ON member_doctor_appointments.member_id = users.user_id WHERE users.status = 1  AND DATE(member_doctor_appointments.appointment_date) >= CURDATE()  -- Filter for future appointments AND DATE(member_doctor_appointments.appointment_date) <= DATE_ADD(CURDATE(), INTERVAL 14 DAY)  -- Two weeks from today";
        // Execute the query and store the result in 'result'
        const [result] = await connection.query(query);
        // console.log(result[0])
        const usersWithAge = result.map((user) => {
            const dob = new Date(user.dob);
            const diff = new Date(Date.now() - dob.getTime());
            const age = diff.getUTCFullYear() - 1970;
            const weight = user.weight;
            const height = user.height;
            const BMI = weight / height;
            return {
                ...user,
                age,
                BMI,
            };
        });
        connection.release(); // Release the connection back to the pool
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, usersWithAge));
    }
    catch (err) {
        console.error("Error in getMemberDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members details"));
    }
};
exports.getMemberAppointments = getMemberAppointments;
const updateHealthDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const { id, weight, height, BMI, diabetes_level, blood_presure, cholesterol_level, injuries, } = req.body;
        const query = "UPDATE members SET weight = ?, height = ? , BMI = ?, diabetes_level = ?, blood_presure=? , cholesterol_level  =?, injuries=?  WHERE member_id = ? ;";
        const [result] = await connection.query(query, [
            weight,
            height,
            BMI,
            diabetes_level,
            blood_presure,
            cholesterol_level,
            injuries,
            id
        ]);
        connection.release(); // Release the connection back to the pool
        // Access the insertId from the result
        const insertedId = result.insertId;
        // Send a success response
        res.status(200).json({
            message: "Data inserted successfully",
            insertedId,
        });
    }
    catch (err) {
        console.error("Error in inserting data:", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error inserting data"));
    }
};
exports.updateHealthDetails = updateHealthDetails;
