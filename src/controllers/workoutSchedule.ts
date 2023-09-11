import { Request, Response } from "express";
import mysql, {
  RowDataPacket,
  OkPacket,
  FieldPacket,
} from "mysql2/promise"; // Import the mysql2/promise library
import { generateResponse } from "../utils";

import dbConfig from "../db";

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

interface ResultType {
    trainerName: string;
    memberCount: number;
  }


export const getworkoutShedule =async(req:Request, res:Response) => {
    try{
        const connection = await pool.getConnection();

        const query = "SELECT exercise_name, sets, reps,exercise_id FROM workout_schedule WHERE member_id =10001"

        const [result] = await connection.query<RowDataPacket[]>(query);

        connection.release();

        res.status(200).json(generateResponse(true,result));
    }
    catch(err){
        console.error("Error in get Trainer details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}