"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUsFormReplySubmition = exports.contactUsRequestView = void 0;
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
const contactUsRequestView = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT contact_us_submitions.submition_id, contact_us_submitions.name, contact_us_submitions.email, contact_us_submitions.message, contact_us_submitions.date, contact_us_submitions.reply_or_not_state, contact_us_reply_submitions.message as reply_message from contact_us_submitions left join contact_us_reply_submitions on contact_us_submitions.submition_id = contact_us_reply_submitions.reply_submition_id ";
        // Execute the query and store the result in 'result'
        const [result] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in contactUsRequests:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching contactUsRequests"));
    }
};
exports.contactUsRequestView = contactUsRequestView;
const contactUsFormReplySubmition = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const { reply_id, replySubmitionID, ans_message } = req.body;
        const query = "INSERT INTO contact_us_reply_submitions (reply_submition_id, message) VALUES (?,?);";
        const [result] = await connection.query(query, [
            replySubmitionID,
            ans_message,
        ]);
        const updateRequestStateQuery = "UPDATE contact_us_submitions SET reply_or_not_state = 1 WHERE submition_id = ?";
        await connection.query(updateRequestStateQuery, [replySubmitionID]);
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
exports.contactUsFormReplySubmition = contactUsFormReplySubmition;
//DELETE REPLY
// export const requestReplyDelete = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const connection = await pool.getConnection(); // Use await to get a connection from the pool
//     const { submition_id } = req.body;
//     const query =
//       "DELETE FROM contact_us_reply_submitions WHERE reply_id=?;";
//     const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
//       submition_id,
//     ]);
//     const updateRequestStateQuery =
//       "UPDATE contact_us_submitions SET reply_or_not_state = 0 WHERE reply_submition_id = ?";
//     await connection.query(updateRequestStateQuery, [submition_id]);
//     connection.release(); // Release the connection back to the pool
//     // Access the insertId from the result
//     const insertedId = result.insertId;
//     // Send a success response
//     res.status(200).json({
//       message: "Data deleted successfully",
//       insertedId,
//     });
//   } catch (err) {
//     console.error("Error in deleting data:", err);
//     res.status(500).json(generateResponse(false, null, "Error deleting data"));
//   }
// };
