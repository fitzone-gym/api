const express = require("express");
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import membersRoutes from "./routes/members";
import receptionistRoutes from './routes/receptionist'
import trainerRoutes from './routes/trainers'

const cors = require("cors"); 

const app = express();

app.use(cors());

// const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/', homeRoutes);
// app.use("/users", membersRoutes);
app.use("/receptionist", receptionistRoutes);
app.use("/memberDetails", membersRoutes);
app.use("/trainerDetails", trainerRoutes)

app.listen(5400, () =>{
    console.log('server is running on port 5400.');
}) 

