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

  export const get_current_events = (req: Request, res: Response) => {
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
            SELECT * FROM events where date=MONTH(CURDATE()) `;

        // Execute the query
        connection.query(query, (err, result) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
              console.error("Error fetching events:", err);
              return res
                .status(500)
                .json(
                  generateResponse(false, null, "Error fetching events")
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

  export const get_all_events = (req: Request, res: Response) => {
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
            SELECT * FROM events `;

        // Execute the query
        connection.query(query, (err, result) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
              console.error("Error fetching events:", err);
              return res
                .status(500)
                .json(
                  generateResponse(false, null, "Error fetching events")
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
        console.error("Error in getting events:", err);
        res
          .status(500)
          .json(
            generateResponse(false, null, "Error fetching events")
          );
      }
  };

// adding new event
  export const addevent = (req: Request, res: Response) => {
    try {
      let reqBody = req.body;
      pool.getConnection((err, connection) => {
        if (err) {
          console.error("Error connecting to the database:", err);
          return res
            .status(500)
            .json(generateResponse(false, null, "Database connection error"));
        }
  
        const query =
          "INSERT INTO `events` ( `name`, `description`, 'status', `date` , `time`) " +
          "VALUES ( ?, ?, ?, ?, ?);";
  
        // Execute the query
        connection.query(
          query,
          [
            reqBody.name,
            reqBody.description,
            reqBody.status,
            reqBody.date,
            reqBody.time,
          ],
          (err, result) => {
            // Release the connection back to the pool
            connection.release();
  
            if (err) {
              console.error("Error fetching Announcement", err);
              return res
                .status(500)
                .json(generateResponse(false, null, "Error fetching users"));
            }
            res.status(200).json(generateResponse(true, result));
          }
        );
      });
    } catch (err) {
      console.error("Error in creating Event:", err);
      res
        .status(500)
        .json(generateResponse(false, null, "Error creating Event"));
    }
  };