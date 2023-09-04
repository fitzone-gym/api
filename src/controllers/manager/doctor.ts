import {Request, Response} from 'express';
import mysql from "mysql2";
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

export const getAllDoctors = (req: Request, res: Response) => {
    try {
      pool.getConnection((err, connection) => {
        console.log("awa");
        if (err) {
          console.error("Error connecting to the database:", err);
          return res
            .status(500)
            .json(
              generateResponse(false, null, "Database connection error")
            );
        }
  
        const query =
         `SELECT first_name, 
                 last_name, 
                 address, 
                 email, 
                 phone_no
               FROM users
              WHERE role_id = 4;`;
  
        // Execute the query
        connection.query(query, (err, result) => {
         
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error fetching doctor:", err);
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
      console.error("Error in getdoctorDetails:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching doctor")
        );
    }
  };
