import { Request, Response } from "express";
import mysql, {
  RowDataPacket,
  OkPacket,
  FieldPacket,
} from "mysql2/promise"; // Import the mysql2/promise library
import { generateResponse } from "../../utils";

import dbConfig from '../../db'


const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

interface ResultType {
  workingMembers: number;
  courseCompleteMembers: number;
  workingTrainers: number;
  feedbackCount:number;
}

export const getCountsForCounterSection = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const workingMembersQuery =
      "SELECT count(*) as workingMembers FROM users where role_id=1 AND status=1";
    const courseCompleteMembersQuery =
      "SELECT count(*) as courseCompleteMembers FROM users where role_id=1 AND status=0";
    const trainerCountQuery =
      "SELECT count(*) as workingTrainers FROM users where role_id=2 AND status=1";
    const complaintCountQuery =
      "SELECT count(*) as feedbackCount FROM feedback";
    // Execute the queries and perform a custom type assertion to inform TypeScript about the shape of the results
    const [
      workingMembersResult,
      courseCompleteMembersResult,
      trainerCountResult,
      feedbackCountResult,
    ] = await Promise.all([
      connection.query<RowDataPacket[]>(workingMembersQuery),
      connection.query<RowDataPacket[]>(courseCompleteMembersQuery),
      connection.query<RowDataPacket[]>(trainerCountQuery),
      connection.query<RowDataPacket[]>(complaintCountQuery),
    ]);

    connection.release(); // Release the connection back to the pool

    const responseData: ResultType = {
      workingMembers: workingMembersResult[0][0].workingMembers,
      courseCompleteMembers:
        courseCompleteMembersResult[0][0].courseCompleteMembers,
      workingTrainers: trainerCountResult[0][0].workingTrainers,
      feedbackCount: feedbackCountResult[0][0].feedbackCount,
    };

    // if successfully processed
    res.status(200).json(generateResponse(true, responseData));
  } catch (err) {
    console.error("Error in getCountsForCounterSection:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching member counts"));
  }
};


//GET TRAINER DETAILS
export const getTrainerDetails = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const query =
      "SELECT users.user_id,users.first_name, users.last_name, users.profile_picture,trainers.expert_area FROM users inner join trainers on trainers.user_id = users.user_id where role_id=2 AND status=1 ";

    // Execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);

    connection.release(); // Release the connection back to the pool

    // if successfully processed
    res.status(200).json(generateResponse(true, result));
  } catch (err) {
    console.error("Error in getTrainerDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching trainer details"));
  }
};


//GET DATA FOR TESTIMONIAL
export const getUserFeedbacksForTestimonial = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const query =
      "SELECT users.user_id, users.first_name, users.last_name, users.role_id, users.profile_picture, feedback.feedback_description FROM users INNER JOIN feedback ON feedback.sender_id = users.user_id WHERE category = 'gym' AND rating >= 3 ORDER BY RAND() LIMIT 3;"

    // Execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);

    connection.release(); // Release the connection back to the pool

    // if successfully processed
    res.status(200).json(generateResponse(true, result));
  } catch (err) {
    console.error("Error in getTrainerDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching user feedback details"));
  }
};


//INSERT CONTACT_US FORM DATA
export const contactUsFormSubmition = async (req: Request, res: Response) => {
  // console.log("callme")
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool
    const { name, email, subject, message } = req.body;
    const query =
      "INSERT INTO contact_us_submitions ( name, email, subject, message) VALUES (?, ?, ?, ?);";
    const [result]: [OkPacket, FieldPacket[]] = await connection.query(query, [
      name,
      email,
      subject,
      message
    ]);

    connection.release(); // Release the connection back to the pool

    // Access the insertId from the result
    const insertedId = result.insertId;
    // Send a success response
    res
      .status(200)
      .json({
        message: "Data inserted successfully",
        insertedId,
      });
  } catch (err) {
    console.error("Error in inserting data:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error inserting data"));
  }
};

