"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberTrainerDetails = exports.getMemberHealthDetails = exports.getMemberPackageDetails = exports.getMemberProfile = void 0;
// import mysql from "mysql2";
// import { RowDataPacket, OkPacket, FieldPacket } from 'mysql2/promise';
const promise_1 = __importDefault(require("mysql2/promise"));
const utils_1 = require("../utils");
const db_1 = __importDefault(require("../db"));
const pool = promise_1.default.createPool({
    host: db_1.default.host,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// export const getMemberProfile = (req: Request, res: Response) => {
//   try {
//     const user_id= req.params.user_id;
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error("Error connecting to the database:", err);
//         return res
//           .status(500)
//           .json(
//             generateResponse(false, null, "Database connection error")
//           );
//       }
//       const query = `SELECT * FROM users  WHERE user_id = ? `;
//       // Execute the query
//       connection.query(query, [user_id], (err, result) => {
//         // Release the connection back to the pool
//         connection.release();
//         if (err) {
//           console.error("Error fetching members:", err);
//           return res
//             .status(500)
//             .json(
//               generateResponse(false, null, "Error fetching users")
//             );
//         }
//         // if successfully process
//         // console.log("Hello")
//         res
//           .status(200)
//           .json(generateResponse(true, result));
//       });
//     });
//   } catch (err) {
//     console.error("Error in getmembersDetails:", err);
//     res
//       .status(500)
//       .json(
//         generateResponse(false, null, "Error fetching members")
//       );
//   }
// };
const getMemberProfile = async (req, res) => {
    // console.log("usr_id",req.params.user_id); 
    // this user_id comes from the route file. we get the id as user_id
    // const user_id  = req.params.user_id;
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM users  WHERE user_id = ? `;
        // const query = ` SELECT mp.*, m.*, u.* FROM member_payment mp INNER JOIN members m ON mp.member_id = m.user_id INNER JOIN users u on m.user_id = u.user_id WHERE u.user_id = ?`;
        const [result] = await connection.query(query, [req.params.user_id]);
        // const memberData = result[0];
        const dob = new Date(result[0].DOB);
        const diff = new Date(Date.now() - dob.getTime());
        const age = diff.getUTCFullYear() - 1970;
        console.log(result);
        console.log('age', age);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, {
            ...result[0],
            age
        }));
    }
    catch (err) {
        console.error("Error in getMemberProfile", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching data from profile details"));
    }
};
exports.getMemberProfile = getMemberProfile;
const getMemberPackageDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM member_payment WHERE member_id = ?`;
        const [result] = await connection.query(query, [req.params.user_id]);
        console.log("package details", result);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result[0]));
    }
    catch (err) {
        console.error("Error in getpackageDetails", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching data from package details"));
    }
};
exports.getMemberPackageDetails = getMemberPackageDetails;
const getMemberHealthDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM members WHERE user_id = ?`;
        const [result] = await connection.query(query, [req.params.user_id]);
        console.log("Health details", result[0]);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result[0]));
    }
    catch (err) {
        console.error("Error in getHealthDetails", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching data from Health details"));
    }
};
exports.getMemberHealthDetails = getMemberHealthDetails;
const getMemberTrainerDetails = async (req, res) => {
    console.log("T_____ID", req.params.user_id);
    try {
        const connection = await pool.getConnection();
        const query = `SELECT * FROM trainers  t INNER JOIN users u ON t.user_id = u.user_id WHERE u.user_id = ?`;
        const [result] = await connection.query(query, [req.params.user_id]);
        console.log("Trainer details", result[0]);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result[0]));
    }
    catch (err) {
        console.error("Error in getHealthDetails", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching data from Health details"));
    }
};
exports.getMemberTrainerDetails = getMemberTrainerDetails;
