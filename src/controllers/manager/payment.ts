import { Request, Response } from "express";
import mysql from "mysql2";
import { generateResponse } from "../../utils";

import dbConfig from "../../db";

const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const doctorGetQuery = `SELECT sp.payment_id as id,u.first_name ,u.last_name ,sp.status,sp.payment_made_date as payment_date, sp.amount  FROM staff_payment sp INNER JOIN users u on sp.user_id = u.user_id WHERE u.role_id = 3`;
const memberGetQuery = `SELECT mp.payment_id as id,u.first_name ,u.last_name ,mp.payment_made_date as payment_date,amount  FROM member_payment mp INNER JOIN users u on mp.member_id = u.user_id `;
const trainerGetQuery = `SELECT sp.payment_id as id,u.first_name ,u.last_name ,sp.status,sp.payment_made_date as payment_date, sp.amount  FROM staff_payment sp INNER JOIN users u on sp.user_id = u.user_id WHERE u.role_id = 2`;
const receptionistGetQuery = `SELECT sp.payment_id as id,u.first_name ,u.last_name ,sp.status,sp.payment_made_date as payment_date, sp.amount  FROM staff_payment sp INNER JOIN users u on sp.user_id = u.user_id WHERE u.role_id = 5`;

export const getPayments = (req: Request, res: Response) => {
  try {
    let table = getTableName(req.params.type);
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }
      const query = getGetQuery(req.params.type);
      // Execute the query
      connection.query(query, (err, result) => {
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
  } catch (err) {
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching payment details"));
  }
};

const getTableName = (type: String) => {
  switch (type) {
    case "doctor":
      return "doctor_payments";
    case "member":
      return "member_payments";
    default:
      return "";
  }
};

const getGetQuery = (type: String) => {
  switch (type) {
    case "doctors":
      return doctorGetQuery;
    case "members":
      return memberGetQuery;
    case "receptionists":
      return receptionistGetQuery;
    case "trainers":
      return trainerGetQuery;
    default:
      console.error("Invalid type provided : " + type);
      throw new Error("Invalid type provided");
  }
};
