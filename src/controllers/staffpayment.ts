import {Request, Response} from 'express';
import mysql from "mysql2";
import { generateResponse } from "../utils";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fit_zone",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export const getstaff_payment = (req: Request, res: Response) => {
  console.log("Staff Paymet");
    try {
    
      pool.getConnection((err, connection) => {
        if (err) {
          console.error("Error connecting to the database:", err);
          return res
            .status(500)
            .json(
              generateResponse(false, null, "Database connection error")
            );
        }
  
        const query = `SELECT * FROM staff_payment  WHERE user_id = 5 `;
  
      
  
        // Execute the query
        connection.query(query, (err, result) => {
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error fetching members:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error fetching users")
              );
          }
  
          // if successfully process
          // console.log("Hello")
          res
            .status(200)
            .json(generateResponse(true, result));
        });
      });
    } catch (err) {
      console.error("Error in getmembersDetails:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching members")
        );
    }
  };
  
  