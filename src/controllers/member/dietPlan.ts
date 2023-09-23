import { Request, Response } from "express";
import mysql, {
    RowDataPacket,

} from "mysql2/promise"; // Import the mysql2/promise library
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

  interface ResultType {
    trainerName: string;
    memberCount: number;
  }

// export const getdietPlan = async(req: Request, res: Response) => {
//     try{
//         const connection = await pool.getConnection();

//         const query = "SELECT ";
//     }
//   }