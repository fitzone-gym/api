import { Request, Response } from "express";
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket,
} from "mysql2/promise";
import { generateResponse } from "../../utils";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import bcrypt from 'bcrypt';
import router from "src/routes/home";

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


export const MemberLogin = async (req: Request,  res: Response) => {
    try {
        const connection = await pool.getConnection()
        const {email, password} = req.body
        console.log(email);
        
        const query = "SELECT * FROM users WHERE email = ? "

        const [result]: any = await connection.query(query, [email])

        if((password === result[0].password)){
            res.json(generateResponse(true,  result[0]))
            
        }else {
            res.json(generateResponse(false, null, "login failed"))
            
        }
    }catch(err) {
        console.log(err);   
    }    
}


export const MemberProfile = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    // const id: number = parseInt(req.params.id, 10);
    const id: number = 10002;
    const role_id: number = parseInt(req.params.role_id, 10);

  
      let userDetails;

      if (role_id === 3) {
        const doctorQuery =
          "SELECT doctors.qualification, doctors.message, doctors.facebook, doctors.twitter, doctors.instergram, users.email, users.password, users.first_name, users.last_name, users.profile_picture, users.role_id, users.phone_no  FROM users INNER JOIN doctors ON users.user_id = doctors.doctor_id WHERE users.user_id = ?";
        const [doctorResult]: any = await connection.query(doctorQuery, [id]);
        userDetails = doctorResult[0];
      } else if (role_id === 4) {
        const managerQuery =
          "SELECT receptionist.*, users.* FROM users INNER JOIN receptionist ON users.user_id = receptionist.user_id WHERE users.user_id = ?";
        const [managerResult]: any = await connection.query(managerQuery, [id]);
        userDetails = managerResult[0];
      }

      if (userDetails) {
        res.json(generateResponse(true, userDetails));
      } else {
        res.json(generateResponse(false, null, "User details not found"));
      }
    
  } catch (err) {
    console.log(err);
  } 
};


export const updateProfile = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool
     const id: number = parseInt(req.params.id, 10);
    const { firstname, lastname, email, contactno, message } = req.body;
    const query =
      "UPDATE users SET first_name = ?, last_name = ? , email = ?, phone_no = ? WHERE user_id = ? ;";
    const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
      firstname,
      lastname,
      email,
      contactno,
      id
    ]);

    const queryN = "UPDATE doctors SET message = ? WHERE id = ? ;";
    const [resultN]: [OkPacket, FieldPacket[]] = await connection.query(queryN, [
      message,
      id,
    ]);

    connection.release(); // Release the connection back to the pool

    // Access the insertId from the result
    const insertedId = result.insertId;
    // Send a success response
    res.status(200).json({
      message: "Data inserted successfully",
      insertedId,
    });
  } catch (err) {
    console.error("Error in inserting data:", err);
    res.status(500).json(generateResponse(false, null, "Error inserting data"));
  }
};
