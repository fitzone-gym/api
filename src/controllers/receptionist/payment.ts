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

export const getPaymentDetails = async (req: Request, res: Response) => {
try {
    const connection = await pool.getConnection(); 

    const query = "SELECT * FROM staff_payment WHERE user_id = 10002";

    // execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);   // store the data into the object
    connection.release();
    // If successfully processed
    res.status(200).json(generateResponse(true,result));

} catch (err) {
    console.error("Error in getting payment details", err);
    res
    .status(500)
    .json(generateResponse(false, null, "Error fetching receptionist payment details"));
}
}
