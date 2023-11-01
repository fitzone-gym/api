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

  export const get_onCallDoctors = (req: Request, res: Response) => {
    const announcementId = req.params.id; // Assuming you pass the announcement ID as a URL parameter
    console.log(announcementId)

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

        const query = "SELECT *  FROM users as u , doctors as d WHERE u.user_id = d.doctor_id AND u.role_id = 3 AND d.doctor_type = 'On Call'";

        // Execute the query
        connection.query(query, (err, result) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
              console.error("Error fetching on Call Doctors:", err);
              return res
                .status(500)
                .json(
                  generateResponse(false, null, "Error fetching on Call doctors")
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
        console.error("Error in event details:", err);
        res
          .status(500)
          .json(
            generateResponse(false, null, "Error fetching events")
          );
      }
  };