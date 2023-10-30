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

export const getMemberDetails = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); // Use await to get a connection from the pool

    const query =
      "SELECT users.first_name, users.last_name, users.email,users.dob, DATE(DATE_FORMAT(joined_date, '%Y-%m-%d')) AS joined_date_formatted ,users.profile_picture ,members.* FROM users inner join members on members.user_id =  users.user_id where users.status=1";

    // Execute the query and store the result in 'result'
    const [result] = await connection.query<RowDataPacket[]>(query);

    // console.log(result[0])

    const usersWithAge = result.map((user) => {
    const dob = new Date(user.dob);
    const diff = new Date(Date.now() - dob.getTime());
    const age = diff.getUTCFullYear() - 1970;

    const weight = user.weight;
    const height=user.height;
    const BMI = weight/height;

    return {
        ...user,
        age, // Add the age property to the user object
        BMI,
    };
    })

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
