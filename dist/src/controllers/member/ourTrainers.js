"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserDetailsbyID = exports.getTrainerDetailsbyID = exports.getTrainerDetails = void 0;
const promise_1 = __importDefault(require("mysql2/promise")); // Import the mysql2/promise library
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
const getTrainerDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT users.user_id,users.first_name,users.last_name,users.profile_picture FROM users INNER JOIN trainers On trainers.user_id = users.user_id WHERE role_id=2 AND status=1";
        const [result] = await connection.query(query);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in get Trainer details:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.getTrainerDetails = getTrainerDetails;
const getTrainerDetailsbyID = async (req, res) => {
    try {
        const user_id = req.params.id;
        const connection = await pool.getConnection();
        const query = "SELECT users.user_id,users.first_name,users.last_name,users.profile_picture, users.email, users.phone_no, users.dob, users.gender, trainers.working_experience, trainers.qualification, reviews.review FROM users INNER JOIN trainers ON trainers.user_id = users.user_id LEFT JOIN reviews ON reviews.trainer_id = users.user_id WHERE trainers.user_id = ?; ";
        const [result] = await connection.query(query, [user_id]);
        const trainerData = result[0];
        const dob = new Date(trainerData.dob);
        const diff = new Date(Date.now() - dob.getTime());
        const age = diff.getUTCFullYear() - 1970;
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, {
            ...trainerData,
            age
        }));
        // res.status(200).json(generateResponse(true,{
        //     result
        //     }))
    }
    catch (err) {
        console.error("Error in get Trainer details:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.getTrainerDetailsbyID = getTrainerDetailsbyID;
const getCurrentUserDetailsbyID = async (req, res) => {
    console.log("user_________id", req.params.user_id);
    try {
        const connection = await pool.getConnection();
        const query = `SELECT m.member_id, m.payment_details, m.trainer_id ,u.first_name, u.last_name from member_payment m inner join users u ON m.member_id = u.user_id where m.member_id = ?`;
        const [result] = await connection.query(query, [req.params.user_id]);
        console.log("Member details", result[0]);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result[0]));
    }
    catch (err) {
        console.error("Error in getPaymentMemberDetails", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching data from Payment Member details"));
    }
};
exports.getCurrentUserDetailsbyID = getCurrentUserDetailsbyID;
