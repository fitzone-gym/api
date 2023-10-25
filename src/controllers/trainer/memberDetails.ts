import {Request, Response} from 'express';
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket, // json packet eka hadaganna me 3 use krnw.
}from "mysql2/promise"; // Import the mysql2/promise library
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

export const getMemberDetails = async (req: Request, res: Response) => {
try {
    const connection = await pool.getConnection(); 

    // need to set the session Id 
    const query = "SELECT u.user_id, u.first_name, u.last_name, u.profile_picture FROM users u INNER JOIN members m ON u.user_id = m.user_id WHERE u.role_id = 1 AND m.trainer_id = ?";

    // execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query,[req.params.user_id]);   // store the data into the object

    connection.release();
    // If successfully processed
    res.status(200).json(generateResponse(true,result));

} catch (err) {
    console.error("Error in getMemberDetails", err);
    res
    .status(500)
    .json(generateResponse(false, null, "Error fetching member details"));
}
}

export const getMemberDetailsById = async (req:Request, res:Response) => {
    try {
        console.log(req.params.user_id)
        const connection = await pool.getConnection(); 
    
        const query = "SELECT first_name, last_name, profile_picture, dob, email, phone_no, gender from users WHERE user_id = ?";
    
        // execute the query and store the result in 'result'
        const [result] = await connection.query<RowDataPacket[]>(query, [req.params.user_id]);   // store the data into the object
        // console.log(result[0]);

        const dob = new Date(result[0].dob)
        const diff = new Date(Date.now() - dob.getTime())
        const age = diff.getUTCFullYear() - 1970

        connection.release();
        // If successfully processed
        res.status(200).json(generateResponse(true,{
            ...result[0],
            age
        }));
        console.log(result);
    
    } catch (err) {
        console.error("Error in getMemberDetails", err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching member details"));
    }
}
