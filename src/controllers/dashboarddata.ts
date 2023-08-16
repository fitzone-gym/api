import { Request, Response } from "express";
import mysql, {
  RowDataPacket,
  OkPacket,
  FieldPacket,
} from "mysql2/promise"; // Import the mysql2/promise library
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

interface ResultType {
  workingMembers: number;
  courseCompleteMembers: number;
  workingTrainers: number;
}

export const getCountsForCounterSection = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const workingMembersQuery =
      "SELECT count(*) as workingMembers FROM users where user_role=1 AND status=1";
    const courseCompleteMembersQuery =
      "SELECT count(*) as courseCompleteMembers FROM users where user_role=1 AND status=0";
    const trainerCountQuery =
      "SELECT count(*) as workingTrainers FROM users where user_role=2 AND status=1";

    // Execute the queries and perform a custom type assertion to inform TypeScript about the shape of the results
    const [
      workingMembersResult,
      courseCompleteMembersResult,
      trainerCountResult,
    ] = await Promise.all([
      connection.query<RowDataPacket[]>(workingMembersQuery),
      connection.query<RowDataPacket[]>(courseCompleteMembersQuery),
      connection.query<RowDataPacket[]>(trainerCountQuery),
    ]);

    connection.release(); // Release the connection back to the pool

    const responseData: ResultType = {
      workingMembers: workingMembersResult[0][0].workingMembers,
      courseCompleteMembers:
        courseCompleteMembersResult[0][0].courseCompleteMembers,
      workingTrainers: trainerCountResult[0][0].workingTrainers,
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







