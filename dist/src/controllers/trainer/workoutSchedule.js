"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExerciseList = exports.deleteExersice = exports.createWorkoutSchedule = exports.getWorkoutSchedule = void 0;
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
const getWorkoutSchedule = async (req, res) => {
    // console.log(req.params.user_id)
    try {
        const connection = await pool.getConnection();
        const query = "SELECT exercise.exercise_id , exercise.name, exercise.calories, workout_schedule.sets, workout_schedule.reps  FROM exercise inner join  workout_schedule on exercise.exercise_id = workout_schedule.exercise_id where workout_schedule.member_id = ?";
        const [result] = await connection.query(query, [req.params.user_id]);
        // console.log(result);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in getWorkoutSchedule", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching workout schedule details"));
    }
};
exports.getWorkoutSchedule = getWorkoutSchedule;
const createWorkoutSchedule = async (req, res) => {
    try {
        const member_id = req.body.user_id;
        const exercise_id = req.body.exercise_id;
        const reps = req.body.reps;
        const sets = req.body.sets;
        // console.log(req.body);
        const connection = await pool.getConnection();
        const query = "INSERT INTO workout_schedule (member_id , exercise_id, reps, sets) values (?,?,?,?)";
        const [result] = await connection.query(query, [member_id, exercise_id, reps, sets]);
        console.log(result);
        connection.release();
        res.status(201).json((0, utils_1.generateResponse)(true, "successfuly created"));
    }
    catch (err) {
        console.error("Error in getworkout schedule ", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error creating workout schedule "));
    }
};
exports.createWorkoutSchedule = createWorkoutSchedule;
const deleteExersice = async (req, res) => {
    console.log("entered into delete");
    try {
        const connection = await pool.getConnection();
        const deleteId = req.params.deleteId; // need to pass delete_Id as a parameter
        console.log("id :" + deleteId);
        //Execute the delete SQL statement to remove the exercise
        const query = "DELETE FROM workout_schedule WHERE exercise_id = ?";
        const [result] = await connection.query(query, [deleteId]);
        console.log(result);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, "successfuly deleted"));
    }
    catch (err) {
        console.error("Error in delete exercise ", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error deleting exercise"));
    }
};
exports.deleteExersice = deleteExersice;
const getExerciseList = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "select exercise.exercise_id, exercise.name FROM exercise LEFT JOIN workout_schedule ON exercise.exercise_id = workout_schedule.exercise_id WHERE workout_schedule.exercise_id IS NULL";
        const [result] = await connection.query(query);
        console.log('res', result);
        connection.release();
        res.status(200).json((0, utils_1.generateResponse)(true, result));
    }
    catch (err) {
        console.error("Error in get exercise ", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching exercise"));
    }
};
exports.getExerciseList = getExerciseList;
