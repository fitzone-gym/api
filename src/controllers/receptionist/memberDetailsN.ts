import {Request, Response} from 'express';
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket, // json packet eka hadaganna me 3 use krnw.
}from "mysql2/promise"; // Import the mysql2/promise library
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

// export const getMemberDetails = async (req: Request, res: Response) => {
// try {

//     const connection = await pool.getConnection(); 
//     console.log("COME HERE")

//     // const query =
//     //   "SELECT *.users, MAX(payment.payment_month) FROM users INNER JOIN members ON users.user_id = members.user_id WHERE users.role_id = 1";

//     const query =
//       "SELECT users.*, MAX(CASE WHEN CURDATE() BETWEEN DATE(member_payment.payment_made_date_time) AND DATE(member_payment.expire_date) THEN 1 ELSE 0 END) AS status FROM users LEFT JOIN member_payment ON users.user_id = member_payment.member_id WHERE users.role_id = 1 GROUP BY users.user_id;";

//     // execute the query and store the result in 'result'
//     const [result] = await connection.query<RowDataPacket[]>(query);   // store the data into the object
//     console.log(result)
//     connection.release();
//     // If successfully processed
//     res.status(200).json(generateResponse(true,result));

// } catch (err) {
//     console.error("Error in getMemberDetails", err);
//     res
//     .status(500)
//     .json(generateResponse(false, null, "Error fetching member details"));
// }
// }

export const getSingleMemberDetails = async (req: Request, res: Response) => {
    try {
      const memberId = req.params.id; // Get the member ID from the request parameters
  
      // Validate that memberId is provided and is a number
      if (!memberId || isNaN(Number(memberId))) {
        return res.status(400).json(generateResponse(false, null, "Invalid member ID"));
      }
  
      const connection = await pool.getConnection();
  
      const query = "SELECT * FROM users INNER JOIN members ON users.user_id = members.user_id WHERE users.user_id = ? AND users.role_id = ";
      const [result] = await connection.query<RowDataPacket[]>(query, [memberId]);
  
      connection.release();
  
      if (result.length === 0) {
        return res.status(404).json(generateResponse(false, null, "Member not found"));
      }
  
      res.status(200).json(generateResponse(true, result[0]));  // Return the first (and only) row of the result
    } catch (err) {
      console.error("Error in getSingleMemberDetails", err);
      res.status(500).json(generateResponse(false, null, "Error fetching member details"));
    }
  }

  

export const getMemberDetailsN = async (req: Request, res: Response) => {
try {

    const connection = await pool.getConnection(); 
    console.log("COME HERE")

    // const query =
    //   "SELECT *.users, MAX(payment.payment_month) FROM users INNER JOIN members ON users.user_id = members.user_id WHERE users.role_id = 1";

    const query = `SELECT users.*, MAX(CASE WHEN CURDATE() BETWEEN DATE(member_payment.payment_made_date_time) AND DATE(member_payment.expire_date) THEN 1 ELSE 0 END) AS payment_status, members.package FROM users LEFT JOIN member_payment ON users.user_id = member_payment.member_id INNER JOIN members on users.user_id=members.user_id  WHERE users.role_id = 1 GROUP BY users.user_id;`;

    // execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);   // store the data into the object
    console.log(result)
    connection.release();
    // If successfully processed
    res.status(200).json(generateResponse(true,result));

} catch (err) {
    console.error("Error in getMemberDetails", err);
    res
    .status(500)
    .json(generateResponse(false, null, "Error fetching member details"));
}
}



  


