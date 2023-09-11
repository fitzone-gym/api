import { Request, Response } from 'express';
import mysql from "mysql2";
import { generateResponse } from "../utils";

import dbConfig from "../db";

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const startUp = (req: Request, res: Response) => {
     console.log("Welcome to FitZone");

     return res
          .status(200)
          .json(generateResponse(true, "welcome to FitZone"));
};