import {Request, Response} from 'express';
import mysql from "mysql2";
import { generateResponse } from "../utils";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fit_zone",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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
  
  
export const deleteTrainer = (req: Request, res: Response) => {
  try {
    const trainerId = req.params.id; // Assuming the trainer ID is passed as a parameter in the request URL

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(
            generateResponse(false, null, "Database connection error")
          );
      }

      const deleteQuery = "DELETE FROM trainers WHERE id = ?"; // Change "id" to the actual primary key field in your "trainers" table

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

       // Check if any rows were affected (deleted)
       if (result && result.affectedRows > 0) { // Ensure result is not null before accessing affectedRows
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