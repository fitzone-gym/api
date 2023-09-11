import {Request, Response} from "express";
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket,
} from "mysql2/promise";
import { generateResponse } from "../../utils";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fit_zone",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0,
});

interface ResultType{
    memberlastName: string;
    

 
}