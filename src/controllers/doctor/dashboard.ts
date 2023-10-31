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

const noOfAppointmentsToday: number=0;
const noOfAppointments:number=0;


export const getMemberAppointmentsCounts = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    //     const query =
    //       "SELECT MONTHNAME(DATE_ADD(DATE_SUB(NOW(), INTERVAL 12 MONTH), INTERVAL m.month - 1 MONTH)) AS appointment_month, IFNULL(COUNT(appointment_date), 0) AS no_of_appointment FROM (SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS m LEFT JOIN  member_doctor_appointments AS a ON
    //     MONTH(a.appointment_date) = m.month
    // WHERE
    //     a.appointment_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH) OR a.appointment_date IS NULL
    // GROUP BY
    //     m.month
    // ORDER BY
    //     m.month DESC;
    // ";

    const query = `
    SELECT 
        MONTHNAME(DATE_ADD(DATE_SUB(NOW(), INTERVAL 12 MONTH), INTERVAL m.month - 1 MONTH)) AS appointment_month, 
        IFNULL(COUNT(appointment_date), 0) AS no_of_appointments
    FROM 
        (SELECT 1 AS month
        UNION SELECT 2
        UNION SELECT 3
        UNION SELECT 4
        UNION SELECT 5
        UNION SELECT 6
        UNION SELECT 7
        UNION SELECT 8
        UNION SELECT 9
        UNION SELECT 10
        UNION SELECT 11
        UNION SELECT 12) AS m
    LEFT JOIN 
        member_doctor_appointments AS a
    ON 
        MONTH(a.appointment_date) = m.month
    WHERE 
        a.appointment_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH) OR a.appointment_date IS NULL
    GROUP BY 
        m.month
    ORDER BY 
        m.month DESC;
`;

    const [result] = await connection.query<RowDataPacket[]>(query);
    connection.release(); // Release the connection back to the pool

    
    res.status(200).json(generateResponse(true, result));

    // if successfully processed
  } catch (err) {
    console.error("Error in getMemberDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching members details"));
  }
};


export const getTodayAppointments = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const query =
      "SELECT count(id) as noof_doctor_appointments_today FROM member_doctor_appointments where DATE(member_doctor_appointments.appointment_date) = CURDATE()  ";

    // Execute the query and store the result in 'result'
    const [noOfAppointmentsToday] = await connection.query<RowDataPacket[]>(
      query
    );

    connection.release(); // Release the connection back to the pool

    const responseData = {
      AppointmentsToday:
        noOfAppointmentsToday[0].noof_doctor_appointments_today,
    };

    // if successfully processed
    res.status(200).json(generateResponse(true, responseData));
  } catch (err) {
    console.error("Error in getMemberDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching members details"));
  }
};


export const getNextWeekAppointments= async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const query =
      "SELECT count(id) as noof_doctor_appointments FROM member_doctor_appointments where DATE(member_doctor_appointments.appointment_date) >= CURDATE()  -- Filter for future appointments AND DATE(member_doctor_appointments.appointment_date) <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)  -- One weeks from today";

    // Execute the query and store the result in 'result'
    const [noOfAppointments] = await connection.query<RowDataPacket[]>(query);

    connection.release(); // Release the connection back to the pool

    const responseData = {
      Appointments: noOfAppointments[0].noof_doctor_appointments,
    };

    // if successfully processed
    res.status(200).json(generateResponse(true, responseData));
  } catch (err) {
    console.error("Error in getMemberDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching members details"));
  }
};


