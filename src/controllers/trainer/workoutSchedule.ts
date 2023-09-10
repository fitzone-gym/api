import {Request, Response} from 'express';
import mysql,{
    RowDataPacket,
    OkPacket,
    FieldPacket,
}from "mysql2/promise";
import { generateResponse } from "../../utils";

import dbConfig from "../../db";

const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
    
    export const getWorkoutSchedule = async(req: Request, res: Response)=>{
        
        try{
            const connection = await pool.getConnection(); 
            const query = "SELECT exercise.exercise_id , exercise.name, exercise.calories, workout_schedule.sets, workout_schedule.reps  FROM exercise inner join  workout_schedule on exercise.exercise_id = workout_schedule.exercise_id where workout_schedule.member_id = ?"

            const [result] = await connection.query<RowDataPacket[]>(query, [req.params.id]); 
            console.log(result);
            
            connection.release();
            res.status(200).json(generateResponse(true,result));

        }catch(err){
            console.error("Error in getWorkoutSchedule", err);
            res
            .status(500)
            .json(generateResponse(false, null, "Error fetching workout schedule details"));
        }
    }

    export const createWorkoutSchedule = async(req:Request, res:Response) =>{

        try{
            const member_id = req.body.member_id
            const exercise_id = req.body.exercise_id    
            const reps =  req.body.reps
            const sets =  req.body.sets

            const connection = await pool.getConnection(); 
            const query = "INSERT INTO workout_schedule (member_id , exercise_id, reps, sets) values (?,?,?,?)"

            const [result] = await connection.query<RowDataPacket[]>(query,[member_id, exercise_id, reps,sets]); 
            console.log(result);
            
            connection.release();
            res.status(201).json(generateResponse(true, "successfuly created"))

        }catch(err){
            console.error("Error in getworkout schedule ", err);
            res
            .status(500)
            .json(generateResponse(false, null, "Error fetching workout schedule details"));

        }
    }

    export const getExerciseList = async(req:Request , res: Response) =>{
        try{
            const connection = await pool.getConnection(); 
            const query  = "SELECT exercise_id ,  name from exercise"
            const [result] = await connection.query<RowDataPacket[]>(query); 
            console.log(result);
            
            connection.release();
            res.status(200).json(generateResponse(true,result));

        }catch(err){
            console.error("Error in get exercise ", err);
            res
            .status(500)
            .json(generateResponse(false, null, "Error fetching exercise"));

        }
    }