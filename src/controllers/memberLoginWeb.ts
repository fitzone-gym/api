import { Request, Response } from "express";
import mysql, { RowDataPacket, OkPacket, FieldPacket } from "mysql2/promise";
import { generateResponse } from "../utils";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import bcrypt from "bcrypt";
import router from "src/routes/home";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fit_zone",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const MemberLogin = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const { email, password } = req.body;
    console.log(email, password);

    const query = "SELECT * FROM users WHERE email = ? ";

    const [result]: any = await connection.query(query, [email]);
    console.log(result);

    // if (await bcrypt.compare(password, result[0].password)) {
    //   res.json(generateResponse(true, result[0]));
    // } else {
    //   res.json(generateResponse(false, null, "login failed"));
    // }

    //console.log(bcrypt(password));

    if ((password === result[0].password)) {
      res.json(generateResponse(true, result[0]));
    } else {
      res.json(generateResponse(false, null, "login failed"));
    }
  } catch (err) {
    console.log(err);
  }
};
