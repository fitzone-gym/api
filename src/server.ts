import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"; 

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

app.use("/receptionist", receptionistRoutes);
app.use("/memberDetails", membersRoutes);
app.use("/trainerDetails", trainerRoutes)

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
//------------------

app.use("/landingPage", landingPageRoute);
app.use("/contactUsSubmition", contactUs);

app.use("/ourTrainers", trainerDetailsRoutes);
app.use("/workoutSchedule", workoutScheduleRoutes)

app.listen(5400, '0.0.0.0', () =>{
    console.log('server is running on port 5400.');
}) 
