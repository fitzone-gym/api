"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountsForCounterSection = void 0;
const promise_1 = __importDefault(require("mysql2/promise")); // Import the mysql2/promise library
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
const getCountsForCounterSection = async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Use await to get a connection from the pool
        const workingMembersQuery = "SELECT count(*) as workingMembers FROM users where user_role=1 AND status=1";
        const courseCompleteMembersQuery = "SELECT count(*) as courseCompleteMembers FROM users where user_role=1 AND status=0";
        const trainerCountQuery = "SELECT count(*) as workingTrainers FROM users where user_role=2 AND status=1";
        // Execute the queries and perform a custom type assertion to inform TypeScript about the shape of the results
        const [workingMembersResult, courseCompleteMembersResult, trainerCountResult,] = await Promise.all([
            connection.query(workingMembersQuery),
            connection.query(courseCompleteMembersQuery),
            connection.query(trainerCountQuery),
        ]);
        connection.release(); // Release the connection back to the pool
        const responseData = {
            workingMembers: workingMembersResult[0][0].workingMembers,
            courseCompleteMembers: courseCompleteMembersResult[0][0].courseCompleteMembers,
            workingTrainers: trainerCountResult[0][0].workingTrainers,
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
