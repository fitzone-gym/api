import {Request, Response} from "express";
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket,
} from "mysql2/promise";
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
  

interface ResultType{

    calories_per_day: number;
    steps_per_day: number;
    water_per_day: number;
    workout_days: number;
    special_announcements: number;
}



export const getMemberDietDetails = async(req: Request, res: Response)=>{
    try{

        const member_id = req.params.id
        const connection = await pool.getConnection();

        const query = "SELECT calories_per_day,steps_per_day from diet_plan where member_id = ?";
        
        const [result] = await connection.query<RowDataPacket[]>(query, [member_id]);

        const memberDietData = result[0];

        connection.release();

        res.status(200).json(generateResponse(true, {
            ...memberDietData
        }))
    }
    catch(err){
        console.error("Error is get member deit paln details", err);
        res.status(500).json(generateResponse(false,null,"Error fetching user feedback details"));
    }
}
