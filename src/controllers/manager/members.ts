import {Request, Response} from 'express';
import mysql from "mysql2";
import { RowDataPacket, OkPacket, FieldPacket } from 'mysql2/promise';
import { generateResponse } from "../../utils";

import dbConfig from "../../db";

const pool = mysql.createPool({
  host: dbConfig.host,
  // port:dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export const getAllMembers = (req: Request, res: Response) => {
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
       `SELECT u.first_name, 
               u.last_name, 
               u.email,
               u.joined_date,
               u.phone_no,
               u.address,
               m.package,
               u.profile_picture,
               u.user_id
       FROM users AS u
       INNER JOIN members AS m ON u.user_id = m.user_id
       WHERE u.role_id = 1;`;

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

export const searchMembers = (req: Request, res: Response) => {
  try {
    const { searchTerm ,searchMonth ,searchYear } = req.query; // Assuming the search term is passed as a query parameter
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
        `SELECT u.first_name, 
                u.last_name, 
                u.email,
                u.joined_date,
                u.phone_no,
                u.address,
                m.package,
                u.profile_picture
        FROM users AS u
        INNER JOIN members AS m ON u.user_id = m.user_id
        WHERE u.role_id = 1
        AND (u.first_name LIKE ? OR u.last_name LIKE ? OR m.package LIKE ?);`;

      const searchPattern = `%${searchTerm}%`; // Add wildcard for partial matching
      const datePattern = `${searchYear}-${searchMonth}-%`
      // Execute the query with search parameters
      connection.query(query, [searchPattern, searchPattern, searchPattern, searchPattern], (err, result) => {
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

