const express = require("express");
import { Request, Response } from 'express';

import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import membersRoutes from "./routes/members";
import trainerDetailsRoutes from "./routes/ourTrainers";
const cors = require("cors"); 

const app = express();

app.use(cors());

// const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/health', (req:Request, res:Response) => {
    res.send("Alive and well!")
})

app.use('/', homeRoutes);
app.use("/users", membersRoutes);
app.use("/ourTrainers", trainerDetailsRoutes);

app.listen(5400, '0.0.0.0', () =>{
    console.log('server is running on port 5400.');
}) 

