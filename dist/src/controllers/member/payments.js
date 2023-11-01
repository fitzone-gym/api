"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getpaymentsDetails = exports.postPackageDetails = exports.getIntent = exports.getpayments = void 0;
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
const getpayments = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT exercise.exercise_id , exercise.name, workout_schedule.sets, workout_schedule.reps  FROM exercise inner join  workout_schedule on exercise.exercise_id = workout_schedule.exercise_id where workout_schedule.member_id = 10001";
        const [result] = await connection.query(query);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in get Trainer details:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.getpayments = getpayments;
const stripe = require('stripe')("sk_test_51O5WG1FwODkYBCTL0aFVQmd84BAvC1Q4aUHLshEKu74u5jRbT0G8FmRUCSyndEkjqUX6y9ptoY2vUGlvQZY85flJ00ZnfEemfy");
//router endpoints
const getIntent = async (req, res) => {
    try {
        // create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "LKR",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        //Return the secret
        res.json({ paymentIntent: paymentIntent.client_secret });
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
};
exports.getIntent = getIntent;
const postPackageDetails = async (req, res) => {
    try {
        const member_id = req.body.user_id;
        const trainer_id = req.body.trainer_id;
        const package_details = req.body.package_details;
        const amount = parseInt(req.body.amount) / 100;
        console.log(req.body);
        // get expire date
        const today = new Date();
        const expire_date = new Date(today);
        // Add one month to the expiration date
        console.log("Package Details--------", package_details);
        {
            package_details === "Monthly" ? (expire_date.setMonth(today.getMonth() + 1)) : package_details === "6 Month" ? (expire_date.setMonth(today.getMonth() + 6)) : (expire_date.setMonth(today.getMonth() + 12));
        }
        // expire_date.setMonth(today.getMonth() + 12);
        console.log("TODAY", new Date());
        console.log("EXPIRE DATE", expire_date);
        const connection = await pool.getConnection();
        const query = "INSERT INTO member_payment (member_id , amount, trainer_id, payment_details, payment_made_date, expire_date ) values (?,?,?,?,?,?)";
        const [result] = await connection.query(query, [member_id, amount, trainer_id, package_details, new Date(), expire_date]);
        console.log(result);
        connection.release();
        res.status(201).json((0, utils_1.generateResponse)(true, "successfully created"));
    }
    catch (err) {
        console.error("Error in add payment details:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching user feedback details"));
    }
};
exports.postPackageDetails = postPackageDetails;
const getpaymentsDetails = async (req, res) => {
    console.log("user_________id", req.params.user_id);
    try {
        const connection = await pool.getConnection();
        const query = `SELECT m.payment_id ,m.amount, m.member_id,DATE_FORMAT(m.payment_made_date, '%Y-%m-%d') AS payment_date ,DATE_FORMAT(m.expire_date, '%Y-%m-%d') AS expire_date, TIME(m.payment_made_date) AS payment_time, m.payment_details ,u.first_name, u.last_name, u.nic, u.phone_no , u.email from member_payment m inner join users u ON m.member_id = u.user_id where m.member_id = ?`;
        const [result] = await connection.query(query, [req.params.user_id]);
        console.log("Trainer payments details", result[0]);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result[0]));
    }
    catch (err) {
        console.error("Error in getPaymentDetails", err);
        res.status(500).json((0, utils_1.generateResponse)(false, null, "Error fetching data from Payment details"));
    }
};
exports.getpaymentsDetails = getpaymentsDetails;
