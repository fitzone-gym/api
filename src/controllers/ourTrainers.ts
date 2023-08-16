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
    trainerName: string;
    memberCount: number;
}

export const getTrainerDetails = async(req: Request, res: Response) => {
    try{
        const connection = await pool.getConnection();

        const query = "SELECT users.id,users.first_name,users.last_name,users.profile_picture FROM users INNER JOIN trainers On trainers.user_id = users.id WHERE user_role=2 AND status=1";

        const [result] = await connection.query<RowDataPacket[]>(query);

        connection.release();

        res.status(200).json(generateResponse(true,result))
    }
    catch(err){
        console.error("Error in get Trainer details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}

export const getTrainerDetailsbyID = async(req: Request, res: Response) => {
    try{

        const user_id = req.params.id

        const connection = await pool.getConnection();

        const query = "SELECT users.id,users.first_name,users.last_name,users.profile_picture, users.email, users.phone_no, users.dob, users.gender, trainers.working_experience, trainers.qualification FROM users INNER JOIN trainers ON trainers.user_id = users.id WHERE trainers.user_id = ? "

        const [result] = await connection.query<RowDataPacket[]>(query, [user_id]);

        const trainerData = result[0];

        console.log(trainerData);
        
        const dob = new Date(trainerData.dob);
        const diff = new Date(Date.now() - dob.getTime());
        const age = diff.getUTCFullYear() - 1970;

        connection.release();

        res.status(200).json(generateResponse(true,{
            ...trainerData,
            age
        }))
    }
    catch(err){
        console.error("Error in get Trainer details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}