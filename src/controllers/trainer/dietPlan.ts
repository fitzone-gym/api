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
        // console.log("member_id" , req.params.member_id);

        const connection = await pool.getConnection();  
        const query = "SELECT m.weight, m.height, u.first_name,u.last_name from members m inner join users u ON  u.user_id = m.user_id where u.user_id = ?";
        const [result] = await connection.query<RowDataPacket[]>(query,[req.params.member_id]);
        // console.log(result);
        connection.release();
        res.status(200).json(generateResponse(true,result));

    }catch(err){
        console.error("Error in getHelthDetails", err);
        res.status(500).json(generateResponse(false,null, "Error fetching data from get helth details"));
    }
} 

export const createBreakfastSchedule = async (req:Request, res:Response) => {
    try{
        const table = req.body.plan
        console.log(req.body);
        
        const connection = await pool.getConnection();
        const query = `INSERT INTO ${table} (member_id, protein_gram, mineral_gram, carbohydrate_gram, fat_gram) values (?,?,?,?,?)`;
        const [result] = await connection.query<RowDataPacket[]>(query,[req.body.member_id, req.body.protein_gram, req.body.mineral_gram, req.body.carbohydrate_gram, req.body.fat_gram]);
        console.log(result);
        connection.release();
        res.status(200).json(generateResponse(true,result));
    }catch(err){
        console.error("Error in createBreakfastSchedule", err);
        res.status(500).json(generateResponse(false,null, "Error create breakfast schedule"));
    }
}

export const getSchedule = async (req: Request, res: Response) => {
    try{
                
        const connection = await pool.getConnection();
        const query1 = 'select * from breakfast where member_id = ?';
        const [result1] = await connection.query<RowDataPacket[]>(query1,[req.params.member_id]);
        const query2 = `select * from lunch where member_id = ?`;
        const [result2] = await connection.query<RowDataPacket[]>(query2,[req.params.member_id]);
        const query3 = `select * from dinner where member_id = ?`;
        const [result3] = await connection.query<RowDataPacket[]>(query3,[req.params.member_id]);
        
        // console.log(result1, result2, result3);

        connection.release();
        res.status(200).json(generateResponse(true, {
            breakfast : result1[0],
            lunch: result2[0],
            dinner: result3[0]
        }));

    }catch(err){
        console.error("Error in createBreakfastSchedule", err);
        res.status(500).json(generateResponse(false,null, "Error create breakfast schedule"));
    }
}