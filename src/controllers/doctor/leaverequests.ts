import { Request, Response } from "express";
import mysql, { RowDataPacket, OkPacket, FieldPacket } from "mysql2/promise";
import { generateResponse } from "../../utils";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import bcrypt from "bcrypt";
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

export const getleaverequestDetails = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const query =
      "SELECT * FROM doctor_leave_requests ORDER BY acceptance_status, requested_date ";

    // Execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);

    connection.release(); // Release the connection back to the pool

    // if successfully processed
    res.status(200).json(generateResponse(true, result));
  } catch (err) {
    console.error("Error in getleaverequestDetails:", err);
    res
      .status(500)
      .json(
        generateResponse(
          false,
          null,
          "Error fetching leaverequestDetails details"
        )
      );
  }
};


export const createLeaveRequest = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
   
    const connection = await pool.getConnection(); // Use await to get a connection from the pool
    const {
      fromDate,
      toDate,
      reason
    } = req.body;
    
    console.log(req.body);

    const fromDateN = new Date(fromDate);
    const toDateN = new Date(toDate);


    console.log(fromDateN, toDateN, reason);
    
    const query = "INSERT INTO doctor_leave_requests (requested_date, from_date, to_date, reason, acceptance_status) values (?,?,?,?,0)";
    const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
      currentDate,
      fromDateN,
      toDateN,
      reason,
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
