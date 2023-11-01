"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUsFormSubmition = exports.getUserFeedbacksForTestimonial = exports.getTrainerDetails = exports.getCountsForCounterSection = void 0;
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
const getCountsForCounterSection = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const workingMembersQuery = "SELECT count(*) as workingMembers FROM users where role_id=1 AND status=1";
        const courseCompleteMembersQuery = "SELECT count(*) as courseCompleteMembers FROM users where role_id=1 AND status=0";
        const trainerCountQuery = "SELECT count(*) as workingTrainers FROM users where role_id=2 AND status=1";
        const complaintCountQuery = "SELECT count(*) as feedbackCount FROM feedback";
        // Execute the queries and perform a custom type assertion to inform TypeScript about the shape of the results
        const [workingMembersResult, courseCompleteMembersResult, trainerCountResult, feedbackCountResult,] = await Promise.all([
            connection.query(workingMembersQuery),
            connection.query(courseCompleteMembersQuery),
            connection.query(trainerCountQuery),
            connection.query(complaintCountQuery),
        ]);
        connection.release(); // Release the connection back to the pool
        const responseData = {
            workingMembers: workingMembersResult[0][0].workingMembers,
            courseCompleteMembers: courseCompleteMembersResult[0][0].courseCompleteMembers,
            workingTrainers: trainerCountResult[0][0].workingTrainers,
            feedbackCount: feedbackCountResult[0][0].feedbackCount,
        };
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, responseData));
    }
    catch (err) {
        console.error("Error in getCountsForCounterSection:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching member counts"));
    }
};
exports.getCountsForCounterSection = getCountsForCounterSection;
//GET TRAINER DETAILS
const getTrainerDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT users.user_id,users.first_name, users.last_name, users.profile_picture,trainers.expert_area FROM users inner join trainers on trainers.user_id = users.user_id where role_id=2 AND status=1 ";
        // Execute the query and store the result in 'result'
        const [result] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getTrainerDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching trainer details"));
    }
};
exports.getTrainerDetails = getTrainerDetails;
//GET DATA FOR TESTIMONIAL
const getUserFeedbacksForTestimonial = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const query = "SELECT users.user_id, users.first_name, users.last_name, users.role_id, users.profile_picture, feedback.feedback_description FROM users INNER JOIN feedback ON feedback.sender_id = users.user_id WHERE category = 'gym' AND rating >= 3 ORDER BY RAND() LIMIT 3;";
        // Execute the query and store the result in 'result'
        const [result] = await connection.query(query);
        connection.release(); // Release the connection back to the pool
        // if successfully processed
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getTrainerDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.getUserFeedbacksForTestimonial = getUserFeedbacksForTestimonial;
//INSERT CONTACT_US FORM DATA
const contactUsFormSubmition = async (req, res) => {
    // console.log("callme")
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const { name, email, subject, message } = req.body;
        const query = "INSERT INTO contact_us_submitions ( name, email, subject, message) VALUES (?, ?, ?, ?);";
        const [result] = await connection.query(query, [
            name,
            email,
            subject,
            message
        ]);
        connection.release(); // Release the connection back to the pool
        // Access the insertId from the result
        const insertedId = result.insertId;
        // Send a success response
        res
            .status(200)
            .json({
            message: "Data inserted successfully",
            insertedId,
        });
    }
    catch (err) {
        console.error("Error in inserting data:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error inserting data"));
    }
};
exports.contactUsFormSubmition = contactUsFormSubmition;
