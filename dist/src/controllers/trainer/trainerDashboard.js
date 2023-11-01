"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberCount = exports.getAvailableNotices = void 0;
// import mysql from "mysql2";
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
const getAvailableNotices = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT announcement_id, title, description, create_date FROM announcement  WHERE FIND_IN_SET('trainer', receiver) > 0";
        // console.log(query);
        const [result] = await connection.query(query);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getAvailableNotices", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching data from Available notices"));
    }
};
exports.getAvailableNotices = getAvailableNotices;
const getMemberCount = async (req, res) => {
    // console.log("enteres");
    // console.log(req.params.user_id)
    try {
        const connection = await pool.getConnection();
        //this query need to be modified. we want to get count of members which related to the paticular trainer 
        const query = "SELECT count(*) as workingMembers FROM members where trainer_id = ? ";
        // Execute the query
        // console.log(query);
        const [result] = await connection.query(query, [req.params.user_id]);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getMemberCount:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching members"));
    }
};
exports.getMemberCount = getMemberCount;
