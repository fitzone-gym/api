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
        
        // console.log(req.params.user_id)
        try{
            const connection = await pool.getConnection(); 
            const query = "SELECT exercise.exercise_id , exercise.name, exercise.calories, workout_schedule.sets, workout_schedule.reps  FROM exercise inner join  workout_schedule on exercise.exercise_id = workout_schedule.exercise_id where workout_schedule.member_id = ?"

            const [result] = await connection.query<RowDataPacket[]>(query, [req.params.user_id]); 
            // console.log(result);
            
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
            const member_id = req.body.user_id
            const exercise_id = req.body.exercise_id    
            const reps =  req.body.reps
            const sets =  req.body.sets

            // console.log(req.body);

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
            .json(generateResponse(false, null, "Error creating workout schedule "));

        }
    }

    export const deleteExersice = async (req: Request, res: Response) => {
        console.log("entered into delete")

        try{
            const connection =  await pool.getConnection();
            const deleteId = req.params.deleteId;  // need to pass delete_Id as a parameter
            console.log("id :"+ deleteId)
            //Execute the delete SQL statement to remove the exercise
            const query = "DELETE FROM workout_schedule WHERE exercise_id = ?";
            const [result] = await connection.query<RowDataPacket[]>(query,[deleteId])
            console.log(result);            
            connection.release();
            res.status(200).json(generateResponse(true, "successfuly deleted"))
        }catch(err){
            console.error("Error in delete exercise ", err);
            res
            .status(500)
            .json(generateResponse(false, null, "Error deleting exercise"));
        }
    }

    export const getExerciseList = async(req:Request , res: Response) =>{  // for the front end drop down list
        try{
            const connection = await pool.getConnection(); 
            const query  = "select exercise.exercise_id, exercise.name FROM exercise LEFT JOIN workout_schedule ON exercise.exercise_id = workout_schedule.exercise_id WHERE workout_schedule.exercise_id IS NULL"
            const [result] = await connection.query<RowDataPacket[]>(query); 
            console.log('res',result);            
            connection.release();
            res.status(200).json(generateResponse(true,result));

        }catch(err){
            console.error("Error in get exercise ", err);
            res
            .status(500)
            .json(generateResponse(false, null, "Error fetching exercise"));

        }
    }

