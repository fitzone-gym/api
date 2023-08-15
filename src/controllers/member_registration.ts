import { Request, Response } from "express";
import mysql, {
        RowDataPacket,
        OkPacket,
        FieldPacket,
} from "mysql2/promise";
import { generateResponse } from "../utils";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fit_zone",
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0,
});


export const MemberRegistration = async(req: Request, res: Response) => {
    try{
        const connection = await pool.getConnection();
        const{first_name, last_name, email, mobile_no, password} = req.body;

        const query = "INSERT INTO users(first_name, last_name, email, phone_no, password) VALUES(?,?,?,?,?)"

        const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
            first_name,
            last_name,
            email,
            mobile_no,
            password
        ]);

        connection.release(); // release the connection back to the pool

        // Access the inserted from the result
        const insertedId = result.insertId;
        // send a sucess response

        res.status(200).json({message: "Data inserted successfully", insertedId,});
        
    }
    catch (err){
        console.error("Error in inserting data", err);
        res.status(500).json(generateResponse(false, null, "Error inserting"));
    }
};