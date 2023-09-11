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

export const getAllDoctors = (req: Request, res: Response) => {
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
                 joined_date, 
                 phone_no
               FROM users
              WHERE role_id = 4;`;
  
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

export const deleteDoctor = (req: Request, res: Response) => {
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
        .json(
          generateResponse(false, null, "Database connection error")
        );
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
          .json(
            generateResponse(false, null, "Error deleting trainer")
          );
      }

   // Check if at least one row was affected (trainer deleted successfully)
if (result) {
res.status(200).json(generateResponse(true, "Trainer deleted successfully"));
} else {
res.status(404).json(generateResponse(false, null, "Trainer not found"));
}
    });
  });
} catch (err) {
  console.error("Error in deleteTrainer:", err);
  res
    .status(500)
    .json(
      generateResponse(false, null, "Error deleting trainer")
    );
}
};
