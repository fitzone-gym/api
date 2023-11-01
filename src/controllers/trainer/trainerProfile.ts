import {Request, Response} from 'express';
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

export const getProfileDetails = async (req:Request, res:Response) =>{
    console.log(req.params.user_id); // this user_id comes from the route file. we get the id as user_id
    try{
        const connection = await pool.getConnection();  
        const query = "SELECT first_name, last_name,profile_picture, dob, email, phone_no, gender from users WHERE user_id = ?";
        const [result] = await connection.query<RowDataPacket[]>(query, [req.params.user_id]);   

        const dob = new Date(result[0].dob)
        const diff = new Date(Date.now() - dob.getTime())
        const age = diff.getUTCFullYear() - 1970

        console.log(result);
        connection.release();
        // res.status(200).json(generateResponse(true,result));
        // const a = { ...result[0],
        //     age}  // create a new object call a and destructure the result value and add the age value into that obj
        // console.log(a);

        res.status(200).json(generateResponse(true,{
            ...result[0],
            age
        }));  // in here we are directly passing the destructred result object and add the age value to it.
                
    }catch(err){
        console.error("Error in getProfileDetails", err);
        res.status(500).json(generateResponse(false,null, "Error fetching data from profile details"));
    }
}


export const getExtraDetails = async (req:Request, res:Response) =>{
    // console.log(req.params.id);
    try{
        const connection = await pool.getConnection();  

        const query = "SELECT working_experience, qualification, expert_area ,ratings from trainers WHERE user_id = ?";
        const [result] = await connection.query<RowDataPacket[]>(query, [req.params.user_id]);   
        // console.log(result);

        connection.release();
        res.status(200).json(generateResponse(true, result));

    }catch(err){
        console.error("Error in getExtraDetails", err);
        res.status(500).json(generateResponse(false,null, "Error fetching data from extra details"));
    }
}

