"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberDietDetails = void 0;
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
const getMemberDietDetails = async (req, res) => {
    try {
        const member_id = req.params.id;
        const connection = await pool.getConnection();
        console.log(member_id);
        const query = "SELECT calories_per_day,steps_per_day,water_per_day from diet_plan where member_id = ?";
        const [result] = await connection.query(query, [member_id]);
        const memberDietData = result[0];
        console.log(result);
        // console.log(memberDietData)
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, {
            ...memberDietData
        }));
    }
    catch (err) {
        //console.error("Error is get member deit paln details", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.getMemberDietDetails = getMemberDietDetails;
