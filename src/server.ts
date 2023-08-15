import express from 'express';
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import membersRoutes from "./routes/members";
import trainerRoutes from "./routes/trainer";
import announcementRoutes from "./routes/announcement";

const cors = require("cors"); 

const app = express();

app.use(cors());

// const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/members", membersRoutes);
app.use('/trainers',trainerRoutes);
app.use('/', homeRoutes);
app.use('/announcement', announcementRoutes);

// app.use('/trainers/:trainer_id',trainerRoutes);

app.listen(5400, () =>{
    console.log('server is running on port 5400.');
}) 

