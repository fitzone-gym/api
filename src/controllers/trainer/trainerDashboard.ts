import {Request, Response} from 'express';
// import mysql from "mysql2";
import mysql, {
        RowDataPacket,
        OkPacket,
        FieldPacket
    }from "mysql2/promise"; 
import { generateResponse } from "../../utils";

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'fit_zone',
    waitForConnections : true,
    connectionLimit:10, //10, meaning the pool can have up to 10 simultaneous connections
    queueLimit:0 //set to 0, there is no limit to the number of queued connection requests.
});

export const getAvailableNotices = async (req:Request, res:Response) =>{
    try{
        const connection = await pool.getConnection();  

        const query = "SELECT annoucement_id, title, description, create_date from  announcement"
        // console.log(query);
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
        // console.log(query);
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

export const getUpNextAppointment = async (req:Request, res:Response) => {
    try{
        console.log(req.params.user_id);
        const connectiion =  await pool.getConnection();
        const query = "SELECT * FROM appointments  WHERE trainer_id = ?  AND selectedDate >= CURDATE() ORDER BY selectedDate ASC, selectedTime ASC  LIMIT 1";
        const [result] = await connectiion.query<RowDataPacket[]>(query,[req.params.user_id]);
        connectiion.release();
        console.log(result);
        res.status(200).json(generateResponse(true,result));
    }catch(err){
        console.error("Error in getUpNextAppointment:", err);
    res
        .status(500)
        .json(
        generateResponse(false, null, "Error fetching Up next Appointmnet")
        );
    }
}

export const getTodayAppointments = async (req:Request, res:Response) => {
    try{
        console.log(req.params.user_id);
        const connectiion =  await pool.getConnection();
        const query = "SELECT * FROM appointments  WHERE trainer_id = ?  AND selectedDate >= CURDATE() ORDER BY selectedDate ASC, selectedTime ASC  LIMIT 1";
        const [result] = await connectiion.query<RowDataPacket[]>(query,[req.params.user_id]);
        connectiion.release();
        console.log(result);
        res.status(200).json(generateResponse(true,result));
    }catch(err){
        console.error("Error in todays appointment count", err);
    res
        .status(500)
        .json(
        generateResponse(false, null, "Error fetching todays appointment count")
        );
    }
}
