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
    

export const makeLeaveRequest = async(req:Request, res:Response)=>{
    
    try{
        const trainer_id = req.body.user_id;
        const fromDate =  req.body.from_date;
        const toDate =  req.body.to_date;

        const connection  =  await pool.getConnection();
        const query = "INSERT INTO leave_request ("


    }catch(err){
        console.error("Error in make leave request" , err);
        res
        .status(500)
        .json(generateResponse(false,null,"Error making leave request"))
    }
}