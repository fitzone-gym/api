import { Request, Response } from "express";
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket,
} from "mysql2/promise";
import { generateResponse } from "../utils";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const pool = mysql.createPool({
host: "localhost",
user: "root",
password: "",
database: "fit_zone",
waitForConnections: true,
connectionLimit:10,
queueLimit:0,
});


export const MemberLogin = async (req: Request,  res: Response) => {
    try {

        const connection = await pool.getConnection()
        const {email, password} = req.body
        console.log(email);
        
        const query = "SELECT * FROM users WHERE email = ? "

        const [result] = await connection.query(query, [email])

        console.log(result);
        


    }catch(err) {
        console.log(err);
        
    }



    
}