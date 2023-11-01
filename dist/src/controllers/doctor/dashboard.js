"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextWeekAppointments = exports.getTodayAppointments = exports.getMemberAppointmentsCounts = void 0;
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
const noOfAppointmentsToday = 0;
const noOfAppointments = 0;
const getMemberAppointmentsCounts = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        //     const query =
        //       "SELECT MONTHNAME(DATE_ADD(DATE_SUB(NOW(), INTERVAL 12 MONTH), INTERVAL m.month - 1 MONTH)) AS appointment_month, IFNULL(COUNT(appointment_date), 0) AS no_of_appointment FROM (SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS m LEFT JOIN  member_doctor_appointments AS a ON
        //     MONTH(a.appointment_date) = m.month
        // WHERE
        //     a.appointment_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH) OR a.appointment_date IS NULL
        // GROUP BY
        //     m.month
        // ORDER BY
        //     m.month DESC;
        // ";
        const query = `
    SELECT 
        MONTHNAME(DATE_ADD(DATE_SUB(NOW(), INTERVAL 12 MONTH), INTERVAL m.month - 1 MONTH)) AS appointment_month, 
        IFNULL(COUNT(appointment_date), 0) AS no_of_appointments
    FROM 
        (SELECT 1 AS month
        UNION SELECT 2
        UNION SELECT 3
        UNION SELECT 4
        UNION SELECT 5
        UNION SELECT 6
        UNION SELECT 7
        UNION SELECT 8
        UNION SELECT 9
        UNION SELECT 10
        UNION SELECT 11
        UNION SELECT 12) AS m
    LEFT JOIN 
        member_doctor_appointments AS a
    ON 
        MONTH(a.appointment_date) = m.month
    WHERE 
        a.appointment_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH) OR a.appointment_date IS NULL
    GROUP BY 
        m.month
    ORDER BY 
        m.month DESC;
`;
        const [result] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        res.status(200).json((0, utils_1.generateResponse)(true, result));
        // if successfully processed
    }
    catch (err) {
        console.error("Error in getMemberDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members details"));
    }
};
exports.getMemberAppointmentsCounts = getMemberAppointmentsCounts;
const getTodayAppointments = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT count(id) as noof_doctor_appointments_today FROM member_doctor_appointments where DATE(member_doctor_appointments.appointment_date) = CURDATE()  ";
        // Execute the query and store the result in 'result'
        const [noOfAppointmentsToday] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        const responseData = {
            AppointmentsToday: noOfAppointmentsToday[0].noof_doctor_appointments_today,
        };
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, responseData));
    }
    catch (err) {
        console.error("Error in getMemberDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members details"));
    }
};
exports.getTodayAppointments = getTodayAppointments;
const getNextWeekAppointments = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT count(id) as noof_doctor_appointments FROM member_doctor_appointments where DATE(member_doctor_appointments.appointment_date) >= CURDATE()  -- Filter for future appointments AND DATE(member_doctor_appointments.appointment_date) <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)  -- One weeks from today";
        // Execute the query and store the result in 'result'
        const [noOfAppointments] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        const responseData = {
            Appointments: noOfAppointments[0].noof_doctor_appointments,
        };
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, responseData));
    }
    catch (err) {
        console.error("Error in getMemberDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members details"));
    }
};
exports.getNextWeekAppointments = getNextWeekAppointments;
