import {Request, Response} from 'express';
import mysql from "mysql2";
import { generateResponse } from "../../utils";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fit_zone",
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





export const getTrainerDetails = (req: Request, res: Response) => {
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
    
          const query = "SELECT * FROM trainers";
    
          // Execute the query
          connection.query(query, (err, result) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
              console.error("Error fetching trainers:", err);
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
        console.error("Error in getrainerDetails:", err);
        res
          .status(500)
          .json(
            generateResponse(false, null, "Error fetching trainers")
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
    
    //manager part 
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
      
        //manager part
        export const deleteReceptionist = (req: Request, res: Response) => {
          // console.log("JJ")
          try {
            // console.log("test")
            const trainerId = req.params.receptionist_id; 
            // Assuming the trainer ID is passed as a parameter in the request URL
            // console.log("frm controller", trainerId);
            pool.getConnection((err, connection) => {
              if (err) {
                console.error("Error connecting to the database:", err);
                return res
                  .status(500)
                  .json(
                    generateResponse(false, null, "Database connection error")
                  );
              }
              // console.log("Query up")
              const deleteQuery = `
              DELETE r, u
              FROM receptionist AS r
              INNER JOIN users AS u ON r.user_id = u.user_id
              WHERE t.receptionist_id = ?;               
            `;
        
              // Execute the delete query with the provided trainerId
              connection.query(deleteQuery, [trainerId], (err, result) => {
                connection.release(); // Release the connection back to the pool
        
                if (err) {
                  console.error("Error deleting receptionist:", err);
                  return res
                    .status(500)
                    .json(
                      generateResponse(false, null, "Error deleting receptionist")
                    );
                }
        
             // Check if at least one row was affected (trainer deleted successfully)
        if (result) {
          res.status(200).json(generateResponse(true, "receptionist deleted successfully"));
        } else {
          res.status(404).json(generateResponse(false, null, "receptionist not found"));
        }
              });
            });
          } catch (err) {
            console.error("Error in deleteReceptionist:", err);
            res
              .status(500)
              .json(
                generateResponse(false, null, "Error deleting receptionist")
              );
          }
        };
        
        export const addReceptionist = (req: Request, res: Response) => {
          // console.log("come here",req.body);
          try {
            pool.getConnection((err, connection) => {
              if (err) {
                console.error("Error connecting to the database:", err);
                return res.status(500).json(generateResponse(false, null, "Database connection error"));
              }
        
                 // Assuming the required trainer data is passed in the request body
            const { first_name, last_name, email, phone_no, role_id, username, password, address} = req.body;
      
            const insertQuery = `
              INSERT INTO users (first_name, last_name, phone_no, email, role_id, username, password, address)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
      
            // Execute the insert query with the provided data
            connection.query(insertQuery, [first_name, last_name, phone_no, email, role_id, username, password, address], (err, result) => {
              
              if (err) {
                connection.release(); // Release the connection back to the pool
                console.error('Error adding receptionist:', err);
                return res.status(500).json(
                    generateResponse(false, null, 'Error adding receptionist')
                );
              }
                    res.status(200).json(generateResponse(true, `Receptionist added successfully`));
                     connection.release();
            });
        });
        } catch (err) {
          console.error('Error in addReceptionist:', err);
          res.status(500).json(
            generateResponse(false, null, 'Error adding receptionist')
          );
        }
      };
      