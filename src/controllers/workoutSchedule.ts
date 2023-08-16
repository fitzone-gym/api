import {Request, Response} from 'express';
import mysql,{
    RowDataPacket,
    OkPacket,
    FieldPacket,
}from "mysql2/promise";
import { generateResponse } from "../utils";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fit_zone",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    });
    
    export const getWorkoutSchedule = async(req: Request, res: Response)=>{
        console.log("test");
        
        try{
            const connection = await pool.getConnection(); 
            const query = "SELECT * FROM workout_schedule "

            const [result] = await connection.query<RowDataPacket[]>(query); 
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
