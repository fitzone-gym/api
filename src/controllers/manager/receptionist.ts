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


export const getMemberCount = (req: Request, res: Response) => {
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

      const query = "SELECT count(*) as workingMembers FROM members";

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
        res
          .status(200)
          .json(generateResponse(true, result));
      });
    });

  } catch (err) {
    console.error("Error in getMemberCount:", err);
    res
      .status(500)
      .json(
        generateResponse(false, null, "Error fetching members")
      );
  }
};





export const getAllTrainers = (req: Request, res: Response) => {
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

      const query = `SELECT * FROM users WHERE role_id = 2  `;

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



// Get Members Details
    export const getMembersDetails = (req: Request, res: Response) => {
        console.log("a");
          try {
            pool.getConnection((err, connection) => {
              if (err) {
                console.error("Error connecting to the database:", err);
                console.log("b");
                return res
                  .status(500)
                  .json(
                    generateResponse(false, null, "Database connection error")
                  );
             
              }
        
              const query = "SELECT * FROM members";
        
              // Execute the query
              connection.query(query, (err, result) => {
                // Release the connection back to the pool
                connection.release();
        
                if (err) {
                  console.error("Error fetching members:", err);
                  return res
                    .status(500)
                    .json(
                      generateResponse(false, null, "Error fetching members")
                    );
                }
        
                // if successfully process
                res
                  .status(200)
                  .json(generateResponse(true, result));
              });
            });
          } catch (err) {
            console.error("Error in getMembersDetails:", err);
            res
              .status(500)
              .json(
                generateResponse(false, null, "Error fetching members")
              );
          }
        };
    
    
        export const getAllReceptionists = (req: Request, res: Response) => {
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
                    WHERE role_id = 5;`;
        
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
      