import { Request, Response } from "express";
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
    
export const getAppointments =  async(req:Request, res:Response) =>{
    try{
        const connection =  await pool.getConnection();
        const trainer_id = req.params.trainer_id;
        const query = "SELECT * FROM appointments WHERE trainer_id = ? AND selectedDate >= CURDATE() ORDER BY MONTH(selectedDate)";
        const [result] = await connection.query<RowDataPacket[]>(query, [trainer_id]);
        connection.release();
        res.status(200).json(generateResponse(true, result))

    }catch(err){
        console.error("Error in get appointment" , err);
        res
        .status(500)
        .json(generateResponse(false,null,"Error fetching appointments"))
    }
}