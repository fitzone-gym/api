import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"; 

import homeRoutes from './routes/home';
import membersRoutes from "./routes/members";
import trainerRoutes from "./routes/trainer";
import announcementRoutes from "./routes/announcement";
import AuthRoutes from "./routes/auth";
import trainerDetailsRoutes from "./routes/ourTrainers";
import landingPageRoute from "./routes/landingPage";
import contactUs from "./routes/contactUs";
import memberLoginWeb from "./routes/memberLoginWeb";
import memberDetailsRoutes from "./routes/memberDetails"
import dashboardRoutes from "./routes/trainerDashboard"
import receptionistRoutes from './routes/receptionist'
import workoutScheduleRoutes from "./routes/workoutSchedule"

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


app.use("/memberDetails", memberDetailsRoutes );
app.use("/dashboard", dashboardRoutes );

app.use("/landingPage", landingPageRoute);
app.use("/contactUsSubmition", contactUs);
app.use("/memberLoginWeb", memberLoginWeb)

app.use("/ourTrainers", trainerDetailsRoutes);
app.use("/workoutSchedule", workoutScheduleRoutes);

app.listen(5400, '0.0.0.0', () =>{
    console.log('server is running on port 5400.');
}) 
