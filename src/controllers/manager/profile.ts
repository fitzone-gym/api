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

export const getProfileDetails = (req: Request, res: Response) => {
  try {
    let user_id = req.params.id;
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }
      const query =
        "SELECT user_id,first_name,last_name,email,nic,DOB,phone_no,profile_picture,address FROM users WHERE user_id = ?";
      // Execute the query
      connection.query(query, [user_id], (err, result) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          console.error("Error fetching payments:", err);
          return res
            .status(500)
            .json(
              generateResponse(false, null, "Error fetching payment details")
            );
        }

        // if successfully process
        res.status(200).json(generateResponse(true, result));
      });
    });
  } catch (err) {}
};

export const updateProfile = (req: Request, res: Response) => {
  try {
    let user_id = req.params.id,
      first_name = req.body.first_name,
      last_name = req.body.last_name,
      email = req.body.email,
      nic = req.body.nic,
      DOB = req.body.DOB,
      phone_no = req.body.phone_no,
      address = req.body.address;
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }
      const query =
        "Update users SET first_name = ?, last_name = ?, email = ?, nic = ?, DOB = ?, phone_no = ?, address = ? FROM users WHERE user_id = ?";
      // Execute the query
      connection.query(
        query,
        [first_name, last_name, email, nic, DOB, phone_no, address, user_id],
        (err, result) => {
          // Release the connection back to the pool
          connection.release();

          if (err) {
            console.error("Error fetching payments:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error fetching payment details")
              );
          }

          // if successfully process
          res.status(200).json(generateResponse(true, result));
        }
      );
    });
  } catch (err) {}
};
