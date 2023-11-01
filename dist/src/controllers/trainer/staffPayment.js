"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentDetails = exports.getTotalPamentByMonth = void 0;
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
const getTotalPamentByMonth = async (req, res) => {
    // console.log(req.params.user_id)
    try {
        const connection = await pool.getConnection();
        // chage the below query by setting the session id
        // const query = "SELECT  DATE_FORMAT(payment_made_date, '%M') AS payment_month, SUM(amount) AS total_payment, payment_details FROM  member_payment  WHERE  trainer_id = ?  GROUP BY payment_month,  payment_details,  trainer_id  ORDER BY  MONTH(payment_month)";
        const query = "SELECT  DATE_FORMAT(payment_made_date, '%M') AS payment_month, 0.8 * SUM(amount) AS total_payment FROM  member_payment  WHERE  trainer_id = ?  GROUP BY payment_month  ORDER BY  MONTH(payment_month)";
        // console.log(query);
        const [result] = await connection.query(query, [req.params.user_id]);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getTotalPamentByMonth:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching total payment "));
    }
};
exports.getTotalPamentByMonth = getTotalPamentByMonth;
const getPaymentDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const month = req.params.month;
        const staff_id = req.params.user_id; // this user_id name comes from the route path
        console.log(month);
        console.log(staff_id);
        const query = "SELECT m.payment_id ,(m.amount * 0.8) AS deducted_amount, m.member_id,DATE_FORMAT(m.payment_made_date, '%Y-%m-%d') AS payment_date ,TIME(m.payment_made_date) AS payment_time, m.payment_details ,u.first_name, u.last_name, u.nic, u.phone_no , u.email from member_payment m inner join users u ON m.member_id = u.user_id where DATE_FORMAT(m.payment_made_date,'%M') = ? AND m.trainer_id = ? ";
        const [result] = await connection.query(query, [month, staff_id]);
        console.log(result);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getMemberCount:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching payment details"));
    }
};
exports.getPaymentDetails = getPaymentDetails;
// I add the payment_made_date_time as a new column to the table member_payment table. because i want to track the time as well. 
