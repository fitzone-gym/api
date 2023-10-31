import {Request, Response} from 'express';
import mysql from "mysql2";
import { generateResponse } from "../../utils";
import{ RowDataPacket, OkPacket, FieldPacket } from "mysql2/promise"; // Import the mysql2/promise library



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

export const getAllFeedbacks = (req: Request, res: Response) => {
  console.log("feedback   ");
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
  
        const query =
        'SELECT * from feedback as f INNER JOIN users as u where f.sender_id = u.user_id';

        
  
        // Execute the query
        connection.query(query, (err, result) => {
         
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error fetching attendence:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error fetching attendence")
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
      console.error("Error in getting feedback:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching getting feedback")
        );
    }
  };


  export const searchFeedback = (req: Request, res: Response) => {
    try {
      const { searchTerm } = req.query; // Assuming the search term is passed as a query parameter
  
      pool.getConnection((err, connection) => {
        if (err) {
          console.error("Error connecting to the database:", err);
          return res
            .status(500)
            .json(
              generateResponse(false, null, "Database connection error")
            );
        }
  
        const query =
          
          'SELECT * from feedback as f INNER JOIN users as u where rating = ? and f.id = u.user_id;';
  
        const searchPattern = `${searchTerm}`; // Add wildcard for partial matching
  
        // Execute the query with search parameters
        connection.query(query, [searchPattern], (err, result) => {
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error searching feedback:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error searching feedback")
              );
          }
  
          // if successfully process
          res
            .status(200)
            .json(generateResponse(true, result));
        });
      });
    } catch (err) {
      console.error("Error in search feedback:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error searching Feedback")
        );
    }
  };

  
  export const feedbackresponce = (req: Request, res: Response) => {
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
  
        const query = 'INSERT INTO feedback (responce) VALUES (?) where id = request.id';


        
  
        // Execute the query
        connection.query(query, (err, result) => {
         
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error fetching attendence:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error fetching attendence")
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
      console.error("Error in getting feedback:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching getting feedback")
        );
    }
  };


 