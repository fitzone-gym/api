import {Request, Response} from "express";
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket,
} from "mysql2/promise";
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

  export const getMemberAppointment = async(req: Request, res: Response) => {
      try{
          const connection = await pool.getConnection();
          const{user_id, first_name, last_name, selectedDate, selectedTime} = req.body;
          
          
  
          const query = "INSERT INTO user_appointment(user_id, first_name, last_name, selectedDate, selectedTime) VALUES(?,?,?,?,?)"
  
          const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
              user_id,
              first_name,
              last_name,
              selectedDate,
              selectedTime,
              
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