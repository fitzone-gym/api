import { Request, Response } from "express";
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
    


export const getLeavedetails = async(req:Request, res:Response)=>{
    try{
        
        const connection = await pool.getConnection();
        const user_id =  req.params.user_id;
        // console.log(user_id);
        const query = "SELECT holidays_taken FROM leave_request WHERE user_id = ? AND Status = 2  ORDER BY leave_date DESC LIMIT 1";
        const [result] = await connection.query<RowDataPacket[]>(query,[user_id]);
        // console.log(result);
        connection.release()
        res.status(200).json(generateResponse(true, result[0]))
        

    }catch(err){
        console.error("Error in get leave request details" , err);
        res
        .status(500)
        .json(generateResponse(false,null,"Error fetching leave request details"))
    }
}

export const makeLeaveRequest = async(req:Request, res:Response)=>{
    
    try{
        const user_id = req.body.user_id;
        const fromDate =  req.body.from_date;
        const toDate =  req.body.to_date;
        const reason = req.body.reason;
        const holidays_taken = req.body.holidays_taken;
        const no_of_leave_dates = req.body.no_of_leave_dates;
        const no_remaining_leave_date = req.body.no_remaining_leave_date;
        const status = req.body.status;

        const connection  =  await pool.getConnection();
        const query = "INSERT INTO leave_request(request_date, leave_date, reason, no_of_leave_dates, holidays_taken, no_remaining_leave_date,user_id,Status) values (?,?,?,?,?,?,?,?)"
        const [result] = await connection.query<RowDataPacket[]>(query,[fromDate, toDate, reason, no_of_leave_dates, holidays_taken, no_remaining_leave_date, user_id, status]);
        // console.log(result);
        connection.release();
        res.status(201).json(generateResponse(true, "successfully created"))

    }catch(err){
        console.error("Error in make leave request" , err);
        res
        .status(500)
        .json(generateResponse(false,null,"Error making leave request"))
    }
}

export const getPending = async(req:Request, res:Response)=>{
    try{
        const user_id =  req.params.user_id;
        // console.log(user_id);
        const connection = await pool.getConnection();
        const query = "SELECT * FROM leave_request where user_id = ? and Status = 1";
        const [result] = await connection.query<RowDataPacket[]>(query,[user_id]);
        connection.release();
        // console.log(result);
        res.status(200).json(generateResponse(true, result));
        

    }catch(err){
        console.error("Error in pending request" , err);
        res
        .status(500)
        .json(generateResponse(false,null,"Error fetching pending request"))
    }
}

export const getAccepted = async(req:Request, res:Response)=>{
    try{
        const user_id =  req.params.user_id;
        // console.log(user_id);
        const connection = await pool.getConnection();
        const query = "SELECT * FROM leave_request where user_id = ? and Status = 2";
        const [result] = await connection.query<RowDataPacket[]>(query,[user_id]);
        connection.release();
        // console.log(result);
        res.status(200).json(generateResponse(true, result));

    }catch(err){
        console.error("Error in accepting request" , err);
        res
        .status(500)
        .json(generateResponse(false,null,"Error fetching accept request"))
    }
}

export const getRejected = async(req:Request, res:Response)=>{
    try{
        const user_id =  req.params.user_id;
        const connection = await pool.getConnection();
        const query = "SELECT * FROM leave_request where user_id = ? and Status = 0";
        const [result] = await connection.query<RowDataPacket[]>(query,[user_id]);
        connection.release();
        // console.log(result);
        res.status(200).json(generateResponse(true, result));

    }catch(err){
        console.error("Error in rejecting request" , err);
        res
        .status(500)
        .json(generateResponse(false,null,"Error fetching reject request"))
    }
}