"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberDetails = void 0;
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
const getMemberDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT users.first_name, users.last_name, users.email,users.dob, DATE(DATE_FORMAT(joined_date, '%Y-%m-%d')) AS joined_date_formatted ,users.profile_picture ,members.* FROM users inner join members on members.user_id =  users.user_id where users.status=1";
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
exports.getMemberDetails = getMemberDetails;
