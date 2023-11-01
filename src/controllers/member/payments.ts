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
    member_id: number;
    trainer_id: number;
    amount: number;
    package_details: string;
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
            currency: "LKR",
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

export const postPackageDetails =async(req:Request, res:Response) => {
    try{
        const member_id = req.body.user_id;
        const trainer_id = req.body.trainer_id;
        const package_details = req.body.package_details;
        const amount=parseInt(req.body.amount)/100;
        console.log(req.body);

        // get expire date
        const today = new Date();
        const expire_date = new Date(today);
        // Add one month to the expiration date
        console.log("Package Details--------",package_details);
        {package_details === "Monthly" ? (
            expire_date.setMonth(today.getMonth() + 1)
        ): package_details === "6 Month" ? (
            expire_date.setMonth(today.getMonth() + 6)
        ): (
            expire_date.setMonth(today.getMonth() + 12)
        )
        }
        // expire_date.setMonth(today.getMonth() + 12);
        console.log("TODAY",new Date());
        console.log("EXPIRE DATE",expire_date);

        const connection = await pool.getConnection();
        
        const query = "INSERT INTO member_payment (member_id , amount, trainer_id, payment_details, payment_made_date, expire_date ) values (?,?,?,?,?,?)"

        const [result] = await connection.query<RowDataPacket[]>(query,[member_id, amount, trainer_id,package_details, new Date(), expire_date]);
        console.log(result);

        connection.release();

        res.status(201).json(generateResponse(true,"successfully created"));
    }
    catch(err){
        console.error("Error in add payment details:",err);
        res
        .status(500)
        .json(generateResponse(false, null, "Error fetching user feedback details"));
    }
}

export const getpaymentsDetails = async(req:Request, res:Response) => {
    console.log("user_________id",req.params.user_id)
    try{
      const connection = await pool.getConnection();
      const query = `SELECT m.payment_id ,m.amount, m.member_id,DATE_FORMAT(m.payment_made_date, '%Y-%m-%d') AS payment_date ,DATE_FORMAT(m.expire_date, '%Y-%m-%d') AS expire_date, TIME(m.payment_made_date) AS payment_time, m.payment_details ,u.first_name, u.last_name, u.nic, u.phone_no , u.email from member_payment m inner join users u ON m.member_id = u.user_id where m.member_id = ?`;
      const [result] = await connection.query<RowDataPacket[]>(query, [req.params.user_id]);
  
      console.log("Trainer payments details",result[0]);
      connection.release();
  
      res.status(200).json(generateResponse(true, result[0]));
  
    }catch(err){
      console.error("Error in getPaymentDetails", err);
      res.status(500).json(generateResponse(false,null, "Error fetching data from Payment details"));
  }
  }