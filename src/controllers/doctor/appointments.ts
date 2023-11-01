import { Request, Response } from "express";
import mysql, { RowDataPacket, OkPacket, FieldPacket } from "mysql2/promise";
import { generateResponse } from "../../utils";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import bcrypt from "bcrypt";
import router from "src/routes/home";

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
                                                   

export const getMemberAppointments = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const query =
      "SELECT users.first_name, users.last_name, users.email, users.dob, DATE(DATE_FORMAT(joined_date, '%Y-%m-%d')) AS joined_date_formatted,users.profile_picture,members.*,member_doctor_appointments.* FROM users INNER JOIN members ON members.user_id = users.user_id INNER JOIN member_doctor_appointments ON member_doctor_appointments.member_id = users.user_id WHERE users.status = 1  AND DATE(member_doctor_appointments.appointment_date) >= CURDATE()  -- Filter for future appointments AND DATE(member_doctor_appointments.appointment_date) <= DATE_ADD(CURDATE(), INTERVAL 14 DAY)  -- Two weeks from today";

    // Execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);

    // console.log(result[0])

    const usersWithAge = result.map((user) => {
      const dob = new Date(user.dob);
      const diff = new Date(Date.now() - dob.getTime());
      const age = diff.getUTCFullYear() - 1970;

      const weight = user.weight;
      const height = user.height;
      const BMI = weight / height;

      return {
        ...user,
        age, // Add the age property to the user object
        BMI,
      };
    });

    connection.release(); // Release the connection back to the pool

    // if successfully processed
    res.status(200).json(generateResponse(true, usersWithAge));
  } catch (err) {
    console.error("Error in getMemberDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching members details"));
  }
};


export const updateHealthDetails = async (req: Request, res: Response) => {
    try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool
    const { id,
            weight,
            height,
            BMI,
            diabetes_level,
            blood_presure,
            cholesterol_level,
            injuries, } = req.body;
    const query =
      "UPDATE members SET weight = ?, height = ? , BMI = ?, diabetes_level = ?, blood_presure=? , cholesterol_level  =?, injuries=?  WHERE member_id = ? ;";
    const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
        weight,
        height,
        BMI,
        diabetes_level,
        blood_presure,
        cholesterol_level,
        injuries,
        id
    ]);

    

    connection.release(); // Release the connection back to the pool

    // Access the insertId from the result
    const insertedId = result.insertId;
    // Send a success response
    res.status(200).json({
      message: "Data inserted successfully",
      insertedId,
    });
  } catch (err) {
    console.error("Error in inserting data:", err);
    res.status(500).json(generateResponse(false, null, "Error inserting data"));
  }
};


