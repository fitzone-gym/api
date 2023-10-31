import { Request, Response } from "express";
import mysql, {
  RowDataPacket,
  OkPacket,
  FieldPacket,
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


export const getpayments =async(req:Request, res:Response) => {
    try{
        const connection = await pool.getConnection();

        const query ="SELECT exercise.exercise_id , exercise.name, workout_schedule.sets, workout_schedule.reps  FROM exercise inner join  workout_schedule on exercise.exercise_id = workout_schedule.exercise_id where workout_schedule.member_id = 10001"

        const [result] = await connection.query<RowDataPacket[]>(query);

        connection.release();

        res.status(200).json(generateResponse(true,result));
    }
    catch(err){
        console.error("Error in get Trainer details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}

const stripe = require('stripe')("sk_test_51O5WG1FwODkYBCTL0aFVQmd84BAvC1Q4aUHLshEKu74u5jRbT0G8FmRUCSyndEkjqUX6y9ptoY2vUGlvQZY85flJ00ZnfEemfy");




//router endpoints
export const getIntent = async (req:Request, res:Response) => {
    try {
        // create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        //Return the secret
        res.json({ paymentIntent: paymentIntent.client_secret});
    }catch (err) {
        res.status(400).json({
             error: err
        });
    }
}

