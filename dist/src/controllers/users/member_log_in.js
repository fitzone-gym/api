"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.MemberProfile = exports.MemberLogin = void 0;
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
const MemberLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { email, password } = req.body;
        // const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        // console.log(password)
        const query = "SELECT * FROM users WHERE email = ?";
        const [result] = await connection.query(query, [email]);
        if ((password === result[0].password)) {
            res.json((0, utils_1.generateResponse)(true, result[0]));
            console.log('password match');
        }
        else {
            res.json((0, utils_1.generateResponse)(false, null, "login failed"));
            console.log('password mismatch');
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.MemberLogin = MemberLogin;
const MemberProfile = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        // const id: number = parseInt(req.params.id, 10);
        const id = 10002;
        const role_id = parseInt(req.params.role_id, 10);
        let userDetails;
        if (role_id === 3) {
            const doctorQuery = "SELECT doctors.qualification, doctors.message, doctors.facebook, doctors.twitter, doctors.instergram, users.email, users.password, users.first_name, users.last_name, users.profile_picture, users.role_id, users.phone_no  FROM users INNER JOIN doctors ON users.user_id = doctors.doctor_id WHERE users.user_id = ?";
            const [doctorResult] = await connection.query(doctorQuery, [id]);
            userDetails = doctorResult[0];
        }
        else if (role_id === 4) {
            const managerQuery = "SELECT receptionist.*, users.* FROM users INNER JOIN receptionist ON users.user_id = receptionist.user_id WHERE users.user_id = ?";
            const [managerResult] = await connection.query(managerQuery, [id]);
            userDetails = managerResult[0];
        }
        if (userDetails) {
            res.json((0, utils_1.generateResponse)(true, userDetails));
        }
        else {
            res.json((0, utils_1.generateResponse)(false, null, "User details not found"));
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.MemberProfile = MemberProfile;
const updateProfile = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const id = parseInt(req.params.id, 10);
        const { firstname, lastname, email, contactno, message } = req.body;
        const query = "UPDATE users SET first_name = ?, last_name = ? , email = ?, phone_no = ? WHERE user_id = ? ;";
        const [result] = await connection.query(query, [
            firstname,
            lastname,
            email,
            contactno,
            id
        ]);
        const queryN = "UPDATE doctors SET message = ? WHERE id = ? ;";
        const [resultN] = await connection.query(queryN, [
            message,
            id,
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
exports.updateProfile = updateProfile;
