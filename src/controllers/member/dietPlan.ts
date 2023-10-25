import {Request, Response} from "express";
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket,
} from "mysql2/promise";
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
  

interface ResultType{

    weight: number;
    height: number;
}



export const getMemberDetails = async(req: Request, res: Response)=>{
    try{

        const member_id = req.params.id
        const connection = await pool.getConnection();

        const query="SELECT DP.calories_per_day, DP.steps_per_day, DP.water_per_day, B.protein_gram AS breakfast_protein_gram, B.mineral_gram AS breakfast_mineral_gram, B.carbohydrate_gram AS breakfast_carbohydrate_gram, B.fat_gram AS breakfast_fat_gram, L.protein_gram AS lunch_protein_gram, L.mineral_gram AS lunch_mineral_gram, L.carbohydrate_gram AS lunch_carbohydrate_gram, L.fat_gram AS lunch_fat_gram, D.protein_gram AS dinner_protein_gram, D.mineral_gram AS dinner_mineral_gram, D.carbohydrate_gram AS dinner_carbohydrate_gram, D.fat_gram AS dinner_fat_gram, S.protein_suppliment, S.weight_gainer, S.creatine, S.preworkout, S.glutamin FROM diet_plan DP LEFT JOIN breakfast B ON DP.plan_id = B.plan_id LEFT JOIN lunch L ON DP.plan_id = L.plan_id LEFT JOIN dinner D ON DP.plan_id = D.plan_id LEFT JOIN suppliment S ON DP.plan_id = S.plan_id WHERE DP.member_id = ?";

        // const query = "SELECT calories_per_day,steps_per_day,water_per_day from diet_plan where member_id = ?";        
        const [result] = await connection.query<RowDataPacket[]>(query, [member_id]);
        const memberDietData = result[0];
     

        connection.release();

        res.status(200).json(generateResponse(true, {
            ...memberDietData,
           
        }))
    }
    catch(err){
        console.error("Error is get member deit paln details", err);
        res.status(500).json(generateResponse(false,null,"Error fetching user feedback details"));
    }
}


