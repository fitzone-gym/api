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

export const getMemberCount = async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();  
        //this query need to be modified. we want to get count of members which related to the paticular trainer 
        const query = "SELECT count(*) as workingMembers FROM members"; 

        // Execute the query
        console.log(query);
        const [result] = await connection.query<RowDataPacket[]>(query);
        connection.release();
        res.status(200).json(generateResponse(true,result));
    } catch (err) {
    console.error("Error in getMemberCount:", err);
    res
        .status(500)
        .json(
        generateResponse(false, null, "Error fetching members")
        );
    }
};
