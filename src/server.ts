const express = require("express");
import bodyParser from 'body-parser';
import homeRoutes from './routes/home';
import memberDetailsRoutes from "./routes/memberDetails"
import dashboardRoutes from "./routes/trainerDashboard"

const cors = require("cors"); 

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//--------Routing---------

// base URL > http://localhost:5400

app.use('/', homeRoutes);
// app.use("/users", membersRoutes);
app.use("/memberDetails", memberDetailsRoutes );
app.use("/dashboard", dashboardRoutes );
//------------------

                  // onama IP address ekkt 
app.listen(5400, '0.0.0.0', () =>{   // run the app  
    console.log('server is running on port 5400.');
}) 

