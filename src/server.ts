import express from "express";
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import membersRoutes from "./routes/member_registration";
import cors from "cors"; 

const app = express();

app.use(cors());

// const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', homeRoutes);
app.use("/memberRegistration", membersRoutes);

app.listen(5400, () =>{
    console.log('server is running on port 5400.');
}) 

