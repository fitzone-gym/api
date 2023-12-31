import { Request, Response } from "express";
import mysql from "mysql2";
import { generateResponse } from "../../utils";

interface InsertResult {
  affectedRows: number;
  insertId: number;
}

import dbConfig from "../../db";
import { generateRandomString, mailer } from "../../utils/commons";

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

// const { format } = require("date-fns");

export const getAllTrainers = (req: Request, res: Response) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }

      const query = `SELECT u.first_name, 
                 u.last_name, 
                 u.nic,
                 t.working_experience, 
                 u.email, 
                 u.joined_date,
                 t.qualification, 
                 u.phone_no, 
                 t.trainer_id,
                 u.profile_picture
               FROM users AS u
               INNER JOIN trainers AS t ON u.user_id = t.user_id
               WHERE u.role_id = 2`;

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

export const addTrainer = (req: Request, res: Response) => {
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
        // password,
        working_experience,
        address,
        qualification,
        expert_area,
      } = req.body;
      const password = generateRandomString(20)
      //get current time from the system/server
      let date_ob = new Date();
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      let joined_date = year + "-" + month + "-" + date;
      const insertQuery = `
        INSERT INTO users (first_name, last_name, phone_no, email, role_id, nic, password, joined_date, address, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, 0)
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
          joined_date,
          address,
        ],
        (err, result) => {
          if (err) {
            connection.release(); // Release the connection back to the pool
            console.error("Error adding trainer:", err);
            return res
              .status(500)
              .json(generateResponse(false, null, "Error adding trainer"));
          }

          // Retrieve the user_id based on the inserted email
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
            if (role_id == 2) {
              const workingExperienceQuery = `
          INSERT INTO trainers (user_id,working_experience,qualification,expert_area,ratings)
          VALUES (?, ?, ?, ?, 0)
          `;

              connection.query(
                workingExperienceQuery,
                [user_id, working_experience, qualification, expert_area],
                (err, result) => {
                  connection.release();

                  if (err) {
                    console.error("Error adding working experience:", err);
                    return res
                      .status(500)
                      .json(
                        generateResponse(
                          false,
                          null,
                          "Error adding working experience"
                        )
                      );
                  }
                  mailer(first_name, email, password)
                  .then(() => {
                    res
                      .status(200)
                      .json(
                        generateResponse(true, `Trainer added successfully`)
                      );
                  })
                  .catch((err) => {
                    console.error(err);
                    res
                      .status(500)
                      .json(
                        generateResponse(
                          true,
                          `Error while sending the email`
                        )
                      );
                  });
                  connection.release();
                }
              );
            }
          });
        }
      );
    });
  } catch (err) {
    console.error("Error in addTrainer:", err);
    res.status(500).json(generateResponse(false, null, "Error adding trainer"));
  }
};

export const deleteTrainer = (req: Request, res: Response) => {
  // console.log("JJ")
  try {
    // console.log("test")
    const trainerId = req.params.trainer_id;
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
        DELETE t, u
        FROM trainers AS t
        INNER JOIN users AS u ON t.user_id = u.user_id
        WHERE t.trainer_id = ?;               
      `;

      // Execute the delete query with the provided trainerId
      connection.query(deleteQuery, [trainerId], (err, result) => {
        connection.release(); // Release the connection back to the pool

        if (err) {
          console.error("Error deleting trainer:", err);
          return res
            .status(500)
            .json(generateResponse(false, null, "Error deleting trainer"));
        }

        // Check if at least one row was affected (trainer deleted successfully)
        if (result) {
          res
            .status(200)
            .json(generateResponse(true, "Trainer deleted successfully"));
        } else {
          res
            .status(404)
            .json(generateResponse(false, null, "Trainer not found"));
        }
      });
    });
  } catch (err) {
    console.error("Error in deleteTrainer:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error deleting trainer"));
  }
};

// Assuming you already have the required imports and setup for Express and MySQL

export const searchTrainers = (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm; // Get the search term from the query parameters

    // Create the SQL query to search for trainers by name
    const query = `
      SELECT u.first_name, 
             u.last_name, 
             t.working_experience, 
             u.email,
             u.joined_date,
             t.qualification, 
             u.phone_no, 
             t.trainer_id,
             u.profile_picture
      FROM users AS u
      INNER JOIN trainers AS t ON u.user_id = t.user_id
      WHERE u.role_id = 2
      AND (u.first_name LIKE ? OR u.last_name LIKE ? OR CONCAT(u.first_name, ' ', u.last_name) LIKE ? );`;

    const searchTermWithWildcards = `%${searchTerm}%`; // Add wildcards for searching

    // Execute the query with the search term
    pool.query(
      query,
      [
        searchTermWithWildcards,
        searchTermWithWildcards,
        searchTermWithWildcards,
        searchTermWithWildcards,
      ],
      (err, result) => {
        if (err) {
          console.error("Error searching for trainers:", err);
          return res
            .status(500)
            .json(
              generateResponse(false, null, "Error searching for trainers")
            );
        }

        res.status(200).json(generateResponse(true, result));
      }
    );
  } catch (err) {
    console.error("Error in searchTrainersByName:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error searching for trainers"));
  }
};

export const getTrainerPayment = (req: Request, res: Response) => {};
