import express from "express";
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import membersRoutes from "./routes/auth";
import cors from "cors"; 

const app = express();

app.use(cors());

// const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', homeRoutes);
app.use("/auth", membersRoutes);

app.listen(5400, () =>{
    console.log('server is running on port 5400.');
}) 
