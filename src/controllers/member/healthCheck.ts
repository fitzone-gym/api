// import {Request, Response} from "express";
// import mysql, {
//     RowDataPacket,
//     OkPacket,
//     FieldPacket,
// } from "mysql2/promise";
// import { generateResponse } from "../../utils";

// import dbConfig from "../../db";

// const pool = mysql.createPool({
//     host: dbConfig.host,
//     user: dbConfig.user,
//     password: dbConfig.password,
//     database: dbConfig.database,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

//   export const getMemberHealthCheck = async(req: Request, res: Response) => {
//     console.log(req.body);
    
//       try{
//           const connection = await pool.getConnection();
//           const{user_id, selectedDate, selectedTime ,} = req.body;
          
          
  
//           const query = "INSERT INTO member_doctor_appointments(member_id, first_name, last_name, selectedDate, selectedTime, trainer_id) VALUES(?,?,?,?,?,10003)"
  
//           const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
//               user_id,

//               selectedDate,
//               selectedTime,
              
//           ]);
  
//           connection.release(); // release the connection back to the pool
  
//           // Access the inserted from the result
//           const insertedId = result.insertId;
//           // send a sucess response
  
//           res.status(200).json({message: "Data inserted successfully", insertedId});
          
//       }
//       catch (err){
//           console.error("Error in inserting data", err);
//           res.status(500).json(generateResponse(false, null, "Error inserting"));
//       }
//   };  