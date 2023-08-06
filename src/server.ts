const express = require("express");
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import landingPageRoute from "./routes/landingPage";
const cors = require("cors"); 

const app = express();

app.use(cors());

// const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', homeRoutes);
app.use("/landingPage", landingPageRoute);

app.listen(5400, () =>{
    console.log('server is running on port 5400.');
}) 

