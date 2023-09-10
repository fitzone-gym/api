import {Request, Response} from 'express';
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

export const getTotalPamentByMonth = async(req:Request, res:Response)=>{
    try{
        const connection = await pool.getConnection();
        // chage the below query by setting the session id
        const query = "SELECT staff_id, payment_month, SUM(amount) AS total_payment FROM staff_payment where staff_id = '20001' GROUP BY payment_month, staff_id ORDER BY CASE WHEN payment_month = 'January' THEN 1 WHEN payment_month = 'February' THEN 2 WHEN payment_month = 'March' THEN 3 WHEN payment_month = 'April' THEN 4 WHEN payment_month = 'May' THEN 5 WHEN payment_month = 'June' THEN 6 WHEN payment_month = 'July' THEN 7 WHEN payment_month = 'August' THEN 8 WHEN payment_month = 'September' THEN 9 WHEN payment_month = 'October' THEN 10 WHEN payment_month = 'November' THEN 11 WHEN payment_month = 'December' THEN 12 END";
        console.log(query);
        const[result] = await connection.query<RowDataPacket[]>(query);
        connection.release();
        res.status(200).json(generateResponse(true,result));
    }catch(err){
        console.error("Error in getTotalPamentByMonth:", err);
        res
            .status(500)
            .json(
            generateResponse(false, null, "Error fetching total payment ")
            );
    }
}

export const getPaymentDetails = async(req: Request,res: Response)=>{
    try{
        const connection = await pool.getConnection();
        const query = "SELECT payment_id ,member_id, payment_month,payment_made_date from staff_payment where staff_id = 20001"; // In here we need to pass the session Id relatd to the staff member
        console.log(query);
        const [result] = await connection.query<RowDataPacket[]>(query);
        connection.release();
        res.status(200).json(generateResponse(true,result));
        
    }catch (err) {
        console.error("Error in getMemberCount:", err);
    res
        .status(500)
        .json(
        generateResponse(false, null, "Error fetching payment details")
        );
    }
}
