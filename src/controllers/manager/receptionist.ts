import { Request, Response } from "express";
import mysql from "mysql2";
import { generateResponse } from "../../utils";

import dbConfig from "../../db";

const pool = mysql.createPool({
  host: dbConfig.host,
  // port: dbConfig.port,
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
          .json(generateResponse(false, null, "Database connection error"));
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
            .json(generateResponse(false, null, "Error fetching users"));
        }

        // if successfully process
        res.status(200).json(generateResponse(true, result));
      });
    });
  } catch (err) {
    console.error("Error in getMemberCount:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching members"));
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
          .json(generateResponse(false, null, "Database connection error"));
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
            .json(generateResponse(false, null, "Error fetching users"));
        }

        // if successfully process
        res.status(200).json(generateResponse(true, result));
      });
    });
  } catch (err) {
    console.error("Error in getrainerDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching trainers"));
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
          .json(generateResponse(false, null, "Database connection error"));
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
            .json(generateResponse(false, null, "Error fetching members"));
        }

        // if successfully process
        res.status(200).json(generateResponse(true, result));
      });
    });
  } catch (err) {
    console.error("Error in getMembersDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching members"));
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
          .json(generateResponse(false, null, "Database connection error"));
      }

      const query = `SELECT user_id as receptionist_id,first_name, 
                       last_name, 
                       address, 
                       email, 
                       phone_no,
                       profile_picture
                     FROM users
                    WHERE role_id = 5;`;

      // Execute the query
      connection.query(query, (err, result) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          console.error("Error fetching receptionist:", err);
          return res
            .status(500)
            .json(generateResponse(false, null, "Error fetching users"));
        }

        // if successfully process
        // console.log("Hello")
        res.status(200).json(generateResponse(true, result));
      });
    });
  } catch (err) {
    console.error("Error in getdoctorDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching doctor"));
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
          .json(generateResponse(false, null, "Database connection error"));
      }
      // console.log("Query up")
      const deleteQuery = `
              DELETE r, u
              FROM receptionists AS r
              INNER JOIN users AS u ON r.user_id = u.user_id
              WHERE u.user_id = ?;               
            `;

      // Execute the delete query with the provided trainerId
      connection.query(deleteQuery, [trainerId], (err, result) => {
        connection.release(); // Release the connection back to the pool

        if (err) {
          console.error("Error deleting receptionist:", err);
          return res
            .status(500)
            .json(generateResponse(false, null, "Error deleting receptionist"));
        }

        // Check if at least one row was affected (trainer deleted successfully)
        if (result) {
          res
            .status(200)
            .json(generateResponse(true, "receptionist deleted successfully"));
        } else {
          res
            .status(404)
            .json(generateResponse(false, null, "receptionist not found"));
        }
      });
    });
  } catch (err) {
    console.error("Error in deleteReceptionist:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error deleting receptionist"));
  }
};

export const addReceptionist = (req: Request, res: Response) => {
  // console.log("come here",req.body);
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }

      // Assuming the required trainer data is passed in the request body
      const {
        first_name,
        last_name,
        email,
        phone_no,
        role_id,
        nic,
        password,
        address,
        qualification,
      } = req.body;
      let date_ob = new Date();
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      let joined_date = year + "-" + month + "-" + date;

      const insertQuery = `
              INSERT INTO users (first_name, last_name, phone_no, email, role_id, nic, password, address,joined_date,status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
            `;

      // Execute the insert query with the provided data
      connection.query(
        insertQuery,
        [
          first_name,
          last_name,
          phone_no,
          email,
          role_id,
          nic,
          password,
          address,
          joined_date,
        ],
        (err, result) => {
          if (err) {
            connection.release(); // Release the connection back to the pool
            console.error("Error adding receptionist:", err);
            return res
              .status(500)
              .json(generateResponse(false, null, "Error adding receptionist"));
          }
          const getUserIdQuery = `
              SELECT user_id FROM users WHERE email = ?`;
          connection.query(getUserIdQuery, [email], (err, userResult: any) => {
            if (err) {
              connection.release(); // Release the connection back to the pool
              console.error("Error retrieving user ID:", err);
              return res
                .status(500)
                .json(
                  generateResponse(false, null, "Error retrieving user ID")
                );
            }
            console.log("email eka enawa");
            console.log("User ID retrieved:", userResult[0]?.user_id); // Print the retrieved user ID
            const user_id = userResult[0]?.user_id;
            if (role_id == 5) {
              const qualificationQuery = `
            INSERT INTO receptionists (user_id,qualifications)
            VALUES (?, ?)
            `;

              connection.query(
                qualificationQuery,
                [user_id, qualification],
                (err, result) => {
                  connection.release();

                  if (err) {
                    console.error("Error adding qualification:", err);
                    return res
                      .status(500)
                      .json(
                        generateResponse(
                          false,
                          null,
                          "Error adding qualification"
                        )
                      );
                  }
                  res
                    .status(200)
                    .json(
                      generateResponse(true, `Receptionist added successfully`)
                    );
                  connection.release();
                }
              );
            }
          });
        }
      );
    });
  } catch (err) {
    console.error("Error in addReceptionist:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error adding receptionist"));
  }
};

export const getReceptionistPayment = (req: Request, res: Response) => {};
