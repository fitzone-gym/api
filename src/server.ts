import express from 'express';
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import membersRoutes from "./routes/members";
import trainerRoutes from "./routes/trainer";
import announcementRoutes from "./routes/announcement";





import AuthRoutes from "./routes/auth";
import cors from "cors"; 

import { Request, Response } from 'express';



import trainerDetailsRoutes from "./routes/ourTrainers";

import landingPageRoute from "./routes/landingPage";
import contactUs from "./routes/contactUs";
import memberLoginWeb from "./routes/memberLoginWeb";

import memberDetailsRoutes from "./routes/memberDetails"
import dashboardRoutes from "./routes/trainerDashboard"



const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/members", membersRoutes);
app.use('/trainers',trainerRoutes);
app.use('/', homeRoutes);
app.use('/announcement', announcementRoutes);
app.use("/users", membersRoutes);
app.use("/members", memberDetailsRoutes );
app.use("/dashboard", dashboardRoutes );



app.use("/landingPage", landingPageRoute);
app.use("/contactUsSubmition", contactUs);
app.use("/memberLoginWeb", memberLoginWeb)

// app.use('/trainers/:trainer_id',trainerRoutes);
app.use("/auth", AuthRoutes);
app.get('/health', (req:Request, res:Response) => {
    res.send("Alive and well!")
})

app.use("/ourTrainers", trainerDetailsRoutes);

app.listen(5400, '0.0.0.0', () =>{
    console.log('server is running on port 5400.');
}) 
