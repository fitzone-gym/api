import {Request, Response} from 'express';
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket,
}from "mysql2/promise"; // Import the mysql2/promise library
import { generateResponse } from "../utils";

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

    const query = "SELECT id, first_name, last_name from users WHERE user_role = 1";
    const [result] = await connection.query<RowDataPacket[]>(query);   // store the data into the object
    connection.release();
    res.status(200).json(generateResponse(true,result));

} catch (err) {
    console.error("Error in getMemberDetails", err);
    res
    .status(500)
    .json(generateResponse(false, null, "Error fetching member details"));
}
}
