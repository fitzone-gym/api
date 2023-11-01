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
    user_id:string
    first_name:string
    last_name:string
    profile_picture:string
    working_experience:number
    qualification:string
    age:number
    dob:string
    phone_no:number
    email:string
    gender:string
    review:string
  }

export const getTrainerDetails = async(req: Request, res: Response) => {
    try{
        const connection = await pool.getConnection();

        const query = "SELECT users.user_id,users.first_name,users.last_name,users.profile_picture FROM users INNER JOIN trainers On trainers.user_id = users.user_id WHERE role_id=2 AND status=1";

        const [result] = await connection.query<RowDataPacket[]>(query);

        connection.release();

        res.status(200).json(generateResponse(true,result))
    }
    catch(err){
        console.error("Error in get Trainer details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}

export const getTrainerDetailsbyID = async(req: Request, res: Response) => {
    try{

        const user_id = req.params.id

        const connection = await pool.getConnection();

        const query = "SELECT users.user_id,users.first_name,users.last_name,users.profile_picture, users.email, users.phone_no, users.dob, users.gender, trainers.working_experience, trainers.qualification, reviews.review FROM users INNER JOIN trainers ON trainers.user_id = users.user_id LEFT JOIN reviews ON reviews.trainer_id = users.user_id WHERE trainers.user_id = ?; "
        const [result] = await connection.query<RowDataPacket[]>(query, [user_id]);

        const trainerData = result[0];
        
        
        const dob = new Date(trainerData.dob);
        const diff = new Date(Date.now() - dob.getTime());
        const age = diff.getUTCFullYear() - 1970;

        connection.release();

        res.status(200).json(generateResponse(true,{
            ...trainerData,
            age
        }))

        // res.status(200).json(generateResponse(true,{
        //     result
        //     }))
    }
    catch(err){
        console.error("Error in get Trainer details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}

export const getCurrentUserDetailsbyID = async(req:Request, res:Response) => {
    console.log("user_________id",req.params.user_id)
    try{
      const connection = await pool.getConnection();
      const query = `SELECT m.member_id, m.payment_details, m.trainer_id ,u.first_name, u.last_name from member_payment m inner join users u ON m.member_id = u.user_id where m.member_id = ?`;
      const [result] = await connection.query<RowDataPacket[]>(query, [req.params.user_id]);
  
      console.log("Member details",result[0]);
      connection.release();
  
      res.status(200).json(generateResponse(true, result[0]));
  
    }catch(err){
      console.error("Error in getPaymentMemberDetails", err);
      res.status(500).json(generateResponse(false,null, "Error fetching data from Payment Member details"));
  }
  }