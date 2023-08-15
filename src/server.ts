const express = require("express");
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import membersRoutes from "./routes/members";
import memberDetailsRoutes from "./routes/memberDetails"
import dashboardRoutes from "./routes/trainerDashboard"

const cors = require("cors"); 

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', homeRoutes);
app.use("/users", membersRoutes);
app.use("/members", memberDetailsRoutes );
app.use("/dashboard", dashboardRoutes );


app.listen(5400, () =>{
    console.log('server is running on port 5400.');
}) 

