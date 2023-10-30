import {Request, Response} from 'express';
import mysql from "mysql2";
import { generateResponse } from "../../utils";
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

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
  export const getmemberattendence = (req: Request, res: Response) => {
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
         `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id WHERE Date = CURRENT_DATE;`;

        
  
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
      console.error("Error in getting member attendence:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching getting member attendence details")
        );
    }
  };
  
  export const searchMemberAttendence = (req: Request, res: Response) => {
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
          `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id WHERE Date = CURRENT_DATE
          AND (u.first_name LIKE ? OR u.last_name LIKE ?);`;
  
        const searchPattern = `%${searchTerm}%`; // Add wildcard for partial matching
  
        // Execute the query with search parameters
        connection.query(query, [searchPattern, searchPattern, searchPattern], (err, result) => {
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error searching members:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error searching members")
              );
          }
  
          // if successfully process
          res
            .status(200)
            .json(generateResponse(true, result));
        });
      });
    } catch (err) {
      console.error("Error in searchMembers:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error searching members")
        );
    }
  };

  export const searchAllMemberAttendence = (req: Request, res: Response) => {
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
          `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id WHERE Date = CURRENT_DATE
          AND (u.first_name LIKE ? OR u.last_name LIKE ?);`;
  
        const searchPattern = `%${searchTerm}%`; // Add wildcard for partial matching
  
        // Execute the query with search parameters
        connection.query(query, [searchPattern, searchPattern, searchPattern], (err, result) => {
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error searching members:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error searching members")
              );
          }
  
          // if successfully process
          res
            .status(200)
            .json(generateResponse(true, result));
        });
      });
    } catch (err) {
      console.error("Error in searchMembers:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error searching members")
        );
    }
  };

  export const getalldaymemberattendence = (req: Request, res: Response) => {
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
         `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id;`;

        
  
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
      console.error("Error in getting member attendence:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching getting member attendence details")
        );
    }
  };
  



  export const addMemberattendence = (req: Request, res: Response) => {
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
         `SELECT * FROM member_attendence as a INNER JOIN users as u on a.member_id = u.user_id;`;

        
  
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
      console.error("Error in getting member attendence:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching getting member attendence details")
        );
    }
  };