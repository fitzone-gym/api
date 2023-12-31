import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"; 
import {config} from '../config';

import homeRoutes from './routes/home';


import announcementRoutes from "./routes/manager/announcement";
import AuthRoutes from "./routes/users/auth";
import landingPageRoute from "./routes/users/landingPage";
import contactUs from "./routes/receptionist/contactUs";
import memberDetailsRoutes from "./routes/receptionist/memberDetails";
import trainerDetailsRoutes from "./routes/member/ourTrainers";
import workoutScheduleRoutes from "./routes/member/workoutSchedule";
import membersRoutes from "./routes/manager/members";
import trainerRoutes from "./routes/manager/trainer";
import leavesRoutes from "./routes/manager/leaves";
import doctorRoutes from "./routes/manager/doctor";
import receptionistDetailsRoutes from "./routes/manager/receptionistDetails";
import memberDetailsRoutesForTrainers from "./routes/trainer/memberDetails";
import dashboardRoutes from "./routes/trainer/trainerDashboard";
import receptionistRoutes from "./routes/receptionist/receptionist";
import trainerDetailRoutes from './routes/receptionist/trainersdetails'
import feedbackRoutes from './routes/manager/feedback'
import dashboardroutes from './routes/receptionist/dashboard'
import eventRoutes from './routes/receptionist/events'
import onCallDoctorRoutes from './routes/receptionist/doctors'
import atendenceRoutes from "./routes/receptionist/attendence"
import receptionistleaverequestsRouts from "./routes/receptionist/leaverequest";


/*doctor */
import membersfordoctorRoutes from "./routes/doctor/members";
import memberdoctorappointmentRoutes from "./routes/doctor/appointments";
import doctorpaymentRoutes from "./routes/doctor/payments";
import doctorleaverequestsRouts from "./routes/doctor/leaverequests";

// import dashboardRoutes from "./routes/trainerDashboard";

// import landingPageRoute from "./routes/landingPage";
// import contactUs from "./routes/contactUs";
// import memberLoginWeb from "./routes/memberLoginWeb";


// import receptionistRoutes from './routes/receptionist'



const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/health', (req:Request, res:Response) => {
    res.send("Alive and well!")
})

// app.use("/receptionist", receptionistRoutes);
app.use("/memberDetails", membersRoutes);
app.use("/trainerDetails", trainerRoutes);

//receptionist
app.use("/trainersdetails", trainerDetailsRoutes);
app.use("/receptionist", receptionistRoutes)
app.use("/trainerdet" , trainerDetailRoutes)
app.use("/feedbacks", feedbackRoutes)
app.use("/dashboard", dashboardroutes);
app.use("/receptionist/doctors", onCallDoctorRoutes);
app.use("/receptionist/attendence", atendenceRoutes );
app.use("/receptionistleaverequests", receptionistleaverequestsRouts);


app.use('/', homeRoutes);

app.use("/auth", AuthRoutes);

app.use("/members", membersRoutes);
app.use('/trainers',trainerRoutes);
app.use('/announcement', announcementRoutes);
app.use('/doctor', doctorRoutes);
app.use('/receptionistDetails', receptionistDetailsRoutes);
app.use('/leaves', leavesRoutes)


app.use("/memberDetails", memberDetailsRoutes );
app.use("/memberDetailsForTrainers", memberDetailsRoutesForTrainers);
app.use("/dashboard", dashboardRoutes );

app.use("/landingPage", landingPageRoute);
app.use("/contactUsSubmition", contactUs);

app.use("/ourTrainers", trainerDetailsRoutes);
app.use("/workoutSchedule", workoutScheduleRoutes)

app.use("/membersfordoctor", membersfordoctorRoutes);
app.use("/memberdoctorappointment", memberdoctorappointmentRoutes);
app.use("/doctorpayments", doctorpaymentRoutes);
app.use("/doctorleaverequests", doctorleaverequestsRouts);

const port = config.server.port

app.listen(port, () =>{
    console.log(`server is running on port ${port}.`);
}) 
