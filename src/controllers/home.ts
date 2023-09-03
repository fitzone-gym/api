import { Request, Response } from 'express';
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

export const startUp = (req: Request, res: Response) => {
     console.log("Welcome to FitZone");

     return res
          .status(200)
          .json(generateResponse(true, "welcome to FitZone"));
};