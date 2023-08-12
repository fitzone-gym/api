import {Request, Response} from 'express';
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket
}from "mysql2/promise"; 

import {generateResponse} from "../utils";

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'fit_zone',
    waitForConnections : true,
    connectionLimit:10, //10, meaning the pool can have up to 10 simultaneous connections
    queueLimit:0 //set to 0, there is no limit to the number of queued connection requests.
});

export const getAvailableNotices = async (req:Request, res:Response) =>{
    try{
        const connection = await pool.getConnection();  

        const query = "SELECT annoucement_id, title, description, create_date from  announcement"
        console.log(query);
        const [result] = await connection.query<RowDataPacket[]>(query);
        connection.release();
        res.status(200).json(generateResponse(true,result));

    }catch(err){
        console.error("Error in getAvailableNotices", err);
        res.status(500).json(generateResponse(false,null, "Error fetching data from Available notices"));
    }
}