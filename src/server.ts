import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"; 

import homeRoutes from './routes/home';
import membersRoutes from "./routes/members";
import trainerRoutes from "./routes/trainer";
import memberDetailsRoutes from "./routes/memberDetails";
import dashboardRoutes from "./routes/trainerDashboard";
import receptionistRoutes from "./routes/receptionist";
import trainerDetailsRoutes from "./routes/ourTrainers";

import announcementRoutes from "./routes/manager/announcement";
import AuthRoutes from "./routes/users/auth";
import landingPageRoute from "./routes/users/landingPage";
import contactUs from "./routes/receptionist/contactUs";


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

app.use("/ourTrainers", trainerDetailsRoutes);

app.listen(5400, '0.0.0.0', () =>{
    console.log('server is running on port 5400.');
}) 
