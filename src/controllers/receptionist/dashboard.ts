import {Request, Response} from 'express';
import mysql, {
    RowDataPacket,
    OkPacket,
    FieldPacket, // json packet eka hadaganna me 3 use krnw.
}from "mysql2/promise"; // Import the mysql2/promise library
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

export const getCount = async (req: Request, res: Response) => {
try {
    const connection = await pool.getConnection(); 

    // const query = "SELECT COUNT(*) FROM users WHERE role_id = 1";

    // // execute the query and store the result in 'result'
    // const [result] = await connection.query<RowDataPacket[]>(query);   // store the data into the object
    // connection.release();
    // // If successfully processed
    // res.status(200).json(generateResponse(true,result));

    const TotalMemberQuery = "SELECT COUNT(*) AS Totalmembercount FROM users WHERE role_id = 1";
    const [TotalMemberResult] = await connection.query<RowDataPacket[]>(TotalMemberQuery);
    

    // Count for new members who joined this month 
    const NewMemberQuery = "SELECT COUNT(*) AS NewMemberCount FROM users INNER JOIN members ON users.user_id = members.user_id WHERE users.role_id = 1 AND joined_date=MONTH(CURDATE())";
    const [NewMemberResult] = await connection.query<RowDataPacket[]>(NewMemberQuery);

    // Count for the total trainers working in the gym.
    const totalTrainersQuery = "SELECT COUNT(*) AS Totaltrainercount FROM users WHERE role_id = 2";
    const [totalTrainersResult] = await connection.query<RowDataPacket[]>(totalTrainersQuery);

    //count for the available on call doctors
    const totalOnCallDocQuery = "SELECT COUNT(*) as TotalonCallDoccount FROM users as u , doctors as d WHERE u.user_id = d.doctor_id AND u.role_id = 3 AND d.doctor_type = 'On Call'";
    const [totalOnCallDocResult] = await connection.query<RowDataPacket[]>(totalOnCallDocQuery);

    //count for the events in the month
    const EventCountQuery = "SELECT COUNT(*) AS Totaleventcount FROM events WHERE date=MONTH(CURDATE())";
    const [totalEventResult] = await connection.query<RowDataPacket[]>(EventCountQuery);

    //count for the new trainers who joined the gym this month
    const newTrainersQuery = "SELECT COUNT(*) AS Newtrainercount FROM users WHERE role_id = 2 AND joined_date=MONTH(CURDATE()) ";
    const [newTrainersResult] = await connection.query<RowDataPacket[]>(newTrainersQuery);

    //count for attendence today in the gym
    const todayAttendenceQuery = "select COUNT(*) AS Todayattendence from member_attendence where Date = DATE(curdate()) ";
    const [todayAttendenceResult] = await connection.query<RowDataPacket[]>(todayAttendenceQuery);

    //count for attendence today in the gym
    const currentAttendenceQuery = "select COUNT(*) AS CurrentAttendence from member_attendence where Date = DATE(curdate()) AND checkout = NULL ";
    const [currentAttendenceResult] = await connection.query<RowDataPacket[]>(currentAttendenceQuery);

    const AnnouncemntQuery = " SELECT * FROM announcement where receiver = 'receptionist' ";
    const [dashbordannouncement] = await connection.query<RowDataPacket[]>(AnnouncemntQuery);

    const DoctorAvailability = " SELECT count(*)  from leave_request where user_id=10006 && CURDATE() BETWEEN DATE(request_date) AND DATE(leave_date) ";
    const [availability] = await connection.query<RowDataPacket[]>(
      DoctorAvailability
    );
    
    
    connection.release();

    
    // Consolidate the counts into one object
    const counts = {
        TotalMemberCount: TotalMemberResult[0].Totalmembercount,
        NewMemberCount: NewMemberResult[0].NewMemberCount,
        TotalTrainerCount : totalTrainersResult[0].Totaltrainercount,
        newTrainersCount: newTrainersResult[0].Newtrainercount,
        todayAttendenceCount: todayAttendenceResult[0].Todayattendence,
        currentAttendenceCount: currentAttendenceResult[0].CurrentAttendence,
        announcementtitle  : dashbordannouncement[0].title,
        announcementbody  : dashbordannouncement[0].description,
        TotalonCallDocCount : totalOnCallDocResult[0].TotalonCallDoccount,
        EventsCount : totalEventResult[0].Totaleventcount,
        DoctorAvailability : totalEventResult[0].availability
    }


    res.status(200).json(generateResponse(true, counts));

} catch (err) {
    console.error("Error in getMemberCountDetails", err);
    res
    .status(500)
    .json(generateResponse(false, null, "Error fetching member details"));
}
}

