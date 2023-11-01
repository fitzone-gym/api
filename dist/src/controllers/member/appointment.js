"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberAppointment = void 0;
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
const getMemberAppointment = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { user_id, first_name, last_name, selectedDate, selectedTime } = req.body;
        const query = "INSERT INTO users(first_name, last_name, email, phone_no, password, user_role) VALUES(?,?,?,?,?,?)";
        const [result] = await connection.query(query, [
            user_id,
            first_name,
            last_name,
            selectedDate,
            selectedTime,
        ]);
        connection.release(); // release the connection back to the pool
        // Access the inserted from the result
        const insertedId = result.insertId;
        // send a sucess response
        res.status(200).json({ message: "Data inserted successfully", insertedId, });
    }
    catch (err) {
        console.error("Error in inserting data", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error inserting"));
    }
};
exports.getMemberAppointment = getMemberAppointment;
