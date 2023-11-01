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
        const member_id = req.params.id;
        const connection = await pool.getConnection();
        const query = "SELECT DP.calories_per_day, DP.steps_per_day, DP.water_per_day, B.protein_gram AS breakfast_protein_gram, B.mineral_gram AS breakfast_mineral_gram, B.carbohydrate_gram AS breakfast_carbohydrate_gram, B.fat_gram AS breakfast_fat_gram, L.protein_gram AS lunch_protein_gram, L.mineral_gram AS lunch_mineral_gram, L.carbohydrate_gram AS lunch_carbohydrate_gram, L.fat_gram AS lunch_fat_gram, D.protein_gram AS dinner_protein_gram, D.mineral_gram AS dinner_mineral_gram, D.carbohydrate_gram AS dinner_carbohydrate_gram, D.fat_gram AS dinner_fat_gram, S.protein_suppliment, S.weight_gainer, S.creatine, S.preworkout, S.glutamin FROM diet_plan DP LEFT JOIN breakfast B ON DP.plan_id = B.plan_id LEFT JOIN lunch L ON DP.plan_id = L.plan_id LEFT JOIN dinner D ON DP.plan_id = D.plan_id LEFT JOIN suppliment S ON DP.plan_id = S.plan_id WHERE DP.member_id = ?";
        // const query = "SELECT calories_per_day,steps_per_day,water_per_day from diet_plan where member_id = ?";        
        const [result] = await connection.query(query, [member_id]);
        const memberDietData = result[0];
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, {
            ...memberDietData,
        }));
    }
    catch (err) {
        console.error("Error is get member deit paln details", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.getMemberDetails = getMemberDetails;
