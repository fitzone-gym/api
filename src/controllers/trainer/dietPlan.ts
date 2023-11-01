import {Request, Response} from 'express';
// import mysql from "mysql2";
import mysql, {
        RowDataPacket,
        OkPacket,
        FieldPacket
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

export const getHelthDetails = async (req:Request, res:Response) =>{
    try{
        console.log("member_id" , req.params.member_id);

        const connection = await pool.getConnection();  
        const query = "SELECT m.weight, m.height, u.first_name,u.last_name from members m inner join users u ON  u.user_id = m.user_id where u.user_id = ?";
        const [result] = await connection.query<RowDataPacket[]>(query,[req.params.member_id]);
        console.log(result);
        connection.release();
        res.status(200).json(generateResponse(true,result));

    }catch(err){
        console.error("Error in getHelthDetails", err);
        res.status(500).json(generateResponse(false,null, "Error fetching data from get helth details"));
    }
} 