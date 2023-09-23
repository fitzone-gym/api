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
  
        const query = `SELECT u.first_name,
        u.last_name,
        u.address,
        u.email,
        u.joined_date,
        u.phone_no,
       d.qualification
 FROM users AS u
 INNER JOIN doctors AS d ON u.user_id = d.doctor_id
 WHERE u.role_id = 3;`;
  
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
console.log("JJ")
try {
  console.log("test")
  const doctorId = req.params.doctor_id; 
  // Assuming the trainer ID is passed as a parameter in the request URL
  console.log("frm controller", doctorId);
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
    DELETE d, u
    FROM doctors AS d
    INNER JOIN users AS u ON d.doctor_id = u.user_id
    WHERE d.doctor_id = ?;               
  `;

    // Execute the delete query with the provided trainerId
    connection.query(deleteQuery, [doctorId], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error deleting doctor:", err);
        return res
          .status(500)
          .json(
            generateResponse(false, null, "Error deleting doctor")
          );
      }

   // Check if at least one row was affected (trainer deleted successfully)
if (result) {
res.status(200).json(generateResponse(true, "Doctor deleted successfully"));
} else {
res.status(404).json(generateResponse(false, null, "Trainer not found"));
}
    });
  });
} catch (err) {
  console.error("Error in deleteDoctor:", err);
  res
    .status(500)
    .json(
      generateResponse(false, null, "Error deleting doctor")
    );
}
};

export const addDoctor = (req: Request, res: Response) => {
  console.log("come doctor",req.body);
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res.status(500).json(generateResponse(false, null, "Database connection error"));
      }

         // Assuming the required trainer data is passed in the request body
    const { first_name, last_name, email, phone_no, role_id, username, password, qualification} = req.body;

    const insertQuery = `
      INSERT INTO users (first_name, last_name, phone_no, email, role_id, username, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the insert query with the provided data
    connection.query(insertQuery, [first_name, last_name, phone_no, email, role_id, username, password], (err, result) => {
      
      if (err) {
        connection.release(); // Release the connection back to the pool
        console.error('Error adding doctor:', err);
        return res.status(500).json(
            generateResponse(false, null, 'Error adding doctor')
        );
      }

        // Retrieve the user_id based on the inserted email
        const getUserIdQuery = `
        SELECT user_id FROM users WHERE email = ?`;

    connection.query(getUserIdQuery, [email], (err, userResult : any) => {
      if (err) {
          connection.release(); // Release the connection back to the pool
          console.error('Error retrieving user ID:', err);
          return res.status(500).json(
              generateResponse(false, null, 'Error retrieving user ID')
          );
      }
      console.log( "email eka enawa")
      console.log("User ID retrieved:", userResult[0]?.user_id); // Print the retrieved user ID
      const user_id = userResult[0]?.user_id;
      if(role_id == 3){

        const qualificationQuery = `
        INSERT INTO doctors (user_id,qualification)
        VALUES (?, ?)
        `;

        connection.query(qualificationQuery, [user_id, qualification], (err, result) => {
            connection.release(); 

            if (err) {
                console.error('Error adding qualification:', err);
                return res.status(500).json(
                    generateResponse(false, null, 'Error adding qualification')
                );
            }
            res.status(200).json(generateResponse(true, `Doctor added successfully`));
        });
      }
    });
    });
});
} catch (err) {
  console.error('Error in addDoctor:', err);
  res.status(500).json(
    generateResponse(false, null, 'Error adding doctor')
  );
}
};
