import { Request, Response } from "express";
import mysql, {
  RowDataPacket,
  OkPacket,
  FieldPacket,
} from "mysql2/promise"; // Import the mysql2/promise library
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

interface ResultType {
    trainerName: string;
    memberCount: number;
    member_id: number;
    trainer_id: number;
    amount: number;
    package_details: string;
  }

export const postMemberDetailsUpdate =async(req:Request, res:Response) => {
    try{
        const user_id = req.body.user_id;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const mobile_no = req.body.mobile_no;
        console.log(req.body);

        const connection = await pool.getConnection();

        const query = "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_no = ? WHERE user_id = ?"; 

        const [result] = await connection.query<RowDataPacket[]>(query,[first_name, last_name, email, mobile_no, user_id]);

        connection.release();

        res.status(201).json(generateResponse(true,"successfully created"));
    }
    catch(err){
        console.error("Error in add payment details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}
