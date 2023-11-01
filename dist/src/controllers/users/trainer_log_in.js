"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerLogin = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const utils_1 = require("../../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
const TrainerLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { email, password } = req.body;
        // const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        // console.log(password)
        const query = "SELECT * FROM users WHERE email = ? AND role_id = 2";
        const [result] = await connection.query(query, [email]);
        console.log(result);
        if (result.length) {
            if (await bcrypt_1.default.compare(password, result[0].password)) {
                res.json((0, utils_1.generateResponse)(true, result[0]));
            }
            else {
                res.json((0, utils_1.generateResponse)(false, null, "email or password incorrect"));
            }
        }
        else {
            res.json((0, utils_1.generateResponse)(false, null, "email or password incorrect"));
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.TrainerLogin = TrainerLogin;
// export const MemberProfile = async (req: Request, res: Response) => {
// try {
// const connection = await pool.getConnection();
// const id: number = parseInt(req.params.id, 10);
// const user_role: number = parseInt(req.params.user_role, 10);
//     let userDetails;
//     if (user_role === 3) {
//     const doctorQuery =
//         "SELECT doctors.qualification, doctors.message, doctors.facebook, doctors.twitter, doctors.instergram, users.email, users.password, users.first_name, users.last_name, users.profile_picture, users.user_role  FROM users INNER JOIN doctors ON users.id = doctors.id WHERE users.id = ?";
//     const [doctorResult]: any = await connection.query(doctorQuery, [id]);
//     userDetails = doctorResult[0];
//     } else if (user_role === 3) {
//     const managerQuery =
//         "SELECT receptionist.*, users.* FROM users INNER JOIN receptionist ON users.id = receptionist.id WHERE users.id = ?";
//     const [managerResult]: any = await connection.query(managerQuery, [id]);
//     userDetails = managerResult[0];
//     }
//     if (userDetails) {
//     res.json(generateResponse(true, userDetails));
//     } else {
//     res.json(generateResponse(false, null, "User details not found"));
//     }
// } catch (err) {
// console.log(err);
// } 
// };
