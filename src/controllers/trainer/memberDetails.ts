import {Request, Response} from 'express';
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket, // json packet eka hadaganna me 3 use krnw.
}from "mysql2/promise"; // Import the mysql2/promise library
import { generateResponse } from "../../utils";

const pool = mysql.createPool({
host: "localhost",
user: "root",
password: "",
database: "fit_zone",
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0,
});

export const getMemberDetails = async (req: Request, res: Response) => {
try {
    const connection = await pool.getConnection(); 

    const query = "SELECT id, first_name, last_name, profile_picture from users WHERE user_role = 1";

    // execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);   // store the data into the object

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

export const getTrainerDetailsById = async (req:Request, res:Response) => {
    try {
        const connection = await pool.getConnection(); 
    
        const query = "SELECT id, first_name, last_name, profile_picture, dob, email, phone_no, gender from users WHERE id = ?";
    
        // execute the query and store the result in 'result'
        const [result] = await connection.query<RowDataPacket[]>(query, [req.params.id]);   // store the data into the object
        console.log(result[0]);


        
    const dob = new Date(result[0].dob)
    const diff = new Date(Date.now() - dob.getTime())
    const age = diff.getUTCFullYear() - 1970

    connection.release();
    // If successfully processed
    res.status(200).json(generateResponse(true,{
        ...result[0],
        age
    }));

    
    } catch (err) {
        console.error("Error in getMemberDetails", err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching member details"));
    }
}
