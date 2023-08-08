import { Request, Response } from "express";
import mysql from "mysql2";
import { generateResponse } from "../utils";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fitzone",
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0,
});

export const MemberRegistration = (req: Request, res: Response) => {
    try{
        pool.getConnection((err,conection) =>{
            if(err) {
                console.error("Error connecting to the database:", err);
                return res.status(500).json(generateResponse(false, null, "Database connection error"));
            }
        });
    }
};