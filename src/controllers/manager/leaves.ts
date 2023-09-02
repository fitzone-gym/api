import {Request, Response} from 'express';
import mysql from "mysql2";
import { generateResponse } from "../../utils";

interface InsertResult {
  affectedRows: number;
  insertId: number;
}

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fit_zone",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export const leaveRequest = (req: Request, res: Response) => {
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
                 l.reason,
                 l.leave_date,
                 l.request_date, 
                 l.no_remaining_leave_date
               FROM users AS u
               INNER JOIN leave_request AS l ON u.user_id = l.user_id
               WHERE u.role_id = 2 AND l.status = 1;`;
  
        
  
        // Execute the query
        connection.query(query, (err, result) => {
         
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error("Error fetching leaves:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Error fetching")
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
      console.error("Error in getleavesDetails:", err);
      res
        .status(500)
        .json(
          generateResponse(false, null, "Error fetching leaves")
        );
    }
  };

//   export const apprdecLeaveRequests = (req: Request, res: Response) => {
//     console.log(req.query.status);
//     try {
//       pool.getConnection((err, connection) => {
//         if (err) {
//           console.error("Error connecting to the database:", err);
//           return res.status(500).json(generateResponse(false, null, "Database connection error"));
//         }
  
//         const statusValue = req.query.status; // Get the status value from the request
  
//         const query = `
//           SELECT u.first_name, 
//                  u.last_name, 
//                  u.email,
//                  l.reason,
//                  l.leave_date,
//                  l.request_date, 
//                  l.no_remaining_leave_date,
//                  CASE
//                      WHEN l.status = 0 THEN 'decline'
//                      WHEN l.status = 2 THEN 'approve'
//                      ELSE 'unknown' -- Handle other status values if needed
//                  END AS status
//           FROM users AS u
//           INNER JOIN leave_request AS l ON u.user_id = l.user_id
//           WHERE u.role_id = 2 AND l.status = ?;`;
  
//         // Use prepared statements to safely inject statusValue
//         connection.query(query, [statusValue], (err, result) => {
//           // Release the connection back to the pool
//           connection.release();
  
//           if (err) {
//             console.error("Error fetching leaves:", err);
//             return res.status(500).json(generateResponse(false, null, "Error fetching"));
//           }
  
//           // If successfully processed
//           res.status(200).json(generateResponse(true, result));
//         });
//       });
//     } catch (err) {
//       console.error("Error in apprdecLeaveRequests:", err);
//       res.status(500).json(generateResponse(false, null, "Error fetching leaves"));
//     }
//   };
  
  
  export const apprleaveRequest = (req: Request, res: Response) => {
    console.log("approve1");
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

            const query = `
                SELECT u.first_name, 
                       u.last_name, 
                       u.email,
                       l.reason,
                       l.leave_date,
                       l.request_date, 
                       l.no_remaining_leave_date,
                       CASE
                       WHEN l.status = 0 THEN 'decline'
                       WHEN l.status = 2 THEN 'approve'
                           ELSE 'unknown' -- Handle other status values if needed
                       END AS status
                FROM users AS u
                INNER JOIN leave_request AS l ON u.user_id = l.user_id
                WHERE u.role_id = 2 AND l.status = 2;`;

            // Execute the query
            connection.query(query, (err, result) => {

                // Release the connection back to the pool
                connection.release();

                if (err) {
                    console.error("Error fetching leaves:", err);
                    return res
                        .status(500)
                        .json(
                            generateResponse(false, null, "Error fetching")
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
        console.error("Error in getleavesDetails:", err);
        res
            .status(500)
            .json(
                generateResponse(false, null, "Error fetching leaves")
            );
    }
};

export const decleaveRequest = (req: Request, res: Response) => {
    console.log("decline1");
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

            const query = `
                SELECT u.first_name, 
                       u.last_name, 
                       u.email,
                       l.reason,
                       l.leave_date,
                       l.request_date, 
                       l.no_remaining_leave_date,
                       CASE
                           WHEN l.status = 0 THEN 'decline'
                           WHEN l.status = 2 THEN 'approve'
                           ELSE 'unknown' -- Handle other status values if needed
                       END AS status
                FROM users AS u
                INNER JOIN leave_request AS l ON u.user_id = l.user_id
                WHERE u.role_id = 2 AND l.status = 0;`;

            // Execute the query
            connection.query(query, (err, result) => {

                // Release the connection back to the pool
                connection.release();

                if (err) {
                    console.error("Error fetching leaves:", err);
                    return res
                        .status(500)
                        .json(
                            generateResponse(false, null, "Error fetching")
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
        console.error("Error in getleavesDetails:", err);
        res
            .status(500)
            .json(
                generateResponse(false, null, "Error fetching leaves")
            );
    }
};


  export const searchLeaves = (req: Request, res: Response) => {
    try {
      const searchTerm = req.query.searchTerm; // Get the search term from the query parameters
  
      // Create the SQL query to search for trainers by name
      const query = `
      SELECT u.first_name, 
      u.last_name, 
      u.email,
      l.reason,
      l.leave_date,
      l.request_date, 
      l.no_remaining_leave_date
        FROM users AS u
        INNER JOIN leave_request AS l ON u.user_id = l.user_id
        WHERE u.role_id = 2
        AND (u.first_name LIKE ? OR u.last_name LIKE ? OR CONCAT(u.first_name, ' ', u.last_name) LIKE ? OR l.reason LIKE ?);`;
  
      const searchTermWithWildcards = `%${searchTerm}%`; // Add wildcards for searching
  
      // Execute the query with the search term
      pool.query(query, [searchTermWithWildcards, searchTermWithWildcards, searchTermWithWildcards, searchTermWithWildcards], (err, result) => {
        if (err) {
          console.error("Error searching for leave requests:", err);
          return res.status(500).json(generateResponse(false, null, "Error searching for leave requests"));
        }
  
        res.status(200).json(generateResponse(true, result));
      });
    } catch (err) {
      console.error("Error in searchLeavesByName:", err);
      res.status(500).json(generateResponse(false, null, "Error searching for leave requests"));
    }
  };
  