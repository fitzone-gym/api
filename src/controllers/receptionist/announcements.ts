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

  export const get_receptionist_Announcement = (req: Request, res: Response) => {
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

        const query = `
            SELECT * FROM announcement where receiver = 'receptionist'; `;

        // Execute the query
        connection.query(query, (err, result) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
              console.error("Error fetching announcement:", err);
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
        console.error("Error in getannouncementDetails:", err);
        res
          .status(500)
          .json(
            generateResponse(false, null, "Error fetching announcement")
          );
      }
  };