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
        // const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        // console.log(password)
        
        const query = "SELECT * FROM users WHERE email = ?"

        const [result]: any = await connection.query(query, [email])

        if(await bcrypt.compare(password, result[0].password)){
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
    const id: number = parseInt(req.params.id, 10);
    const user_role: number = parseInt(req.params.user_role, 10);

  
      let userDetails;

      if (user_role === 3) {
        const doctorQuery =
          "SELECT doctors.qualification, doctors.message, doctors.facebook, doctors.twitter, doctors.instergram, users.email, users.password, users.first_name, users.last_name, users.profile_picture, users.user_role  FROM users INNER JOIN doctors ON users.id = doctors.id WHERE users.id = ?";
        const [doctorResult]: any = await connection.query(doctorQuery, [id]);
        userDetails = doctorResult[0];
      } else if (user_role === 3) {
        const managerQuery =
          "SELECT receptionist.*, users.* FROM users INNER JOIN receptionist ON users.id = receptionist.id WHERE users.id = ?";
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
