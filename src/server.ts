import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "../config";

import homeRoutes from "./routes/home";
import AuthRoutes from "./routes/users/auth";
import landingPageRoute from "./routes/users/landingPage";

import contactUs from "./routes/receptionist/contactUs";
import memberDetailsRoutes from "./routes/receptionist/memberDetails";


import trainerDetailsRoutes from "./routes/member/ourTrainers";
import workoutScheduleRoutes from "./routes/member/workoutSchedule";

import membersRoutes from "./routes/manager/members";
import trainerRoutes from "./routes/manager/trainer";
import leavesRoutes from "./routes/manager/leaves";
import doctorRoutes from "./routes/manager/doctor";
import paymentStaffRoutes from "./routes/manager/payment";
import profileRoutes from "./routes/manager/profile";
import receptionistDetailsRoutes from "./routes/manager/receptionistDetails";
import announcementRoutes from "./routes/manager/announcement";
import managerDashboardRoutes from "./routes/manager/dashboard";
import memberDetailsRoutesForTrainers from "./routes/trainer/memberDetails";
import dashboardRoutes from "./routes/trainer/trainerDashboard";
import memberDashboardRoutes from "./routes/member/dashboard";
import paymentDetailsRoutes from "./routes/trainer/paymentDetails";
import trainerLeavesRequestRoute from "./routes/trainer/leaveRequest";
import trainerProfileRoutes from "./routes/trainer/trainerProfile";
import trainerAppointmentRoutes from "./routes/trainer/appointments";

import receptionistRoutes from "./routes/receptionist/receptionist";
import trainerDetailRoutes from './routes/receptionist/trainersdetails'
import feedbackRoutes from './routes/manager/feedback'
import dashboardroutes from './routes/receptionist/dashboard'
import eventRoutes from './routes/receptionist/events'
import onCallDoctorRoutes from './routes/receptionist/doctors'
import atendenceRoutes from "./routes/receptionist/attendence"



import memberDietPlanRoutes from "./routes/member/dietPlan";
import memberAppointmentRoutes from "./routes/member/appointment";

import paymentRoutes from "./routes/member/payments"
import memberProfileRoutes from "./routes/member/memberProfile";
import memberUpdateRoutes from "./routes/member/memberUpdate";


/*doctor */
import membersfordoctorRoutes from "./routes/doctor/members";
import memberdoctorappointmentRoutes from "./routes/doctor/appointments";
import doctorpaymentRoutes from "./routes/doctor/payments";
import doctorleaverequestsRouts from "./routes/doctor/leaverequests";
import doctordashboardRoutes from "./routes/doctor/dashboard";

// import dashboardRoutes from "./routes/trainerDashboard";

// import landingPageRoute from "./routes/landingPage";
// import contactUs from "./routes/contactUs";
// import memberLoginWeb from "./routes/memberLoginWeb";

// import receptionistRoutes from './routes/receptionist'

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.get("/health", (req: Request, res: Response) => {
    res.send("Alive and well!");
});

// app.use("/receptionist", receptionistRoutes);
app.use("/memberDetails", membersRoutes);
app.use("/trainerDetails", trainerRoutes);

//receptionist
app.use("/trainersdetails", trainerDetailsRoutes);
app.use("/receptionist", receptionistRoutes)
app.use("/trainerdet" , trainerDetailRoutes)
app.use("/feedbacks", feedbackRoutes)
app.use("/dashboard", dashboardroutes);
app.use("/events", eventRoutes);
app.use("/receptionist/doctors" , onCallDoctorRoutes);
app.use("/receptionist/attendence", atendenceRoutes)

app.use('/', homeRoutes);

app.use("/auth", AuthRoutes);

app.use("/members", membersRoutes);
app.use("/trainers", trainerRoutes);
app.use("/announcement", announcementRoutes);
app.use("/doctor", doctorRoutes);
app.use("/receptionistDetails", receptionistDetailsRoutes);
app.use("/leaves", leavesRoutes);
app.use("/payment", paymentStaffRoutes);
app.use("/profile", profileRoutes);
app.use("/managerDashboard", managerDashboardRoutes);

app.use("/memberDetails", memberDetailsRoutes);

app.use("/dashboard", dashboardRoutes);
app.use("/memberDetailsForTrainers", memberDetailsRoutesForTrainers);
app.use("/payment", paymentDetailsRoutes);
app.use("/trainerProfile", trainerProfileRoutes);
app.use("/trainerLeaves", trainerLeavesRequestRoute);
app.use("/trainerAppointments",trainerAppointmentRoutes);

app.use("/landingPage", landingPageRoute);
app.use("/contactUsSubmition", contactUs);

app.use("/ourTrainers", trainerDetailsRoutes);
app.use("/workoutSchedule", workoutScheduleRoutes);

app.use("/membersfordoctor", membersfordoctorRoutes);
app.use("/memberdoctorappointment", memberdoctorappointmentRoutes);
app.use("/doctorpayments", doctorpaymentRoutes);
app.use("/doctorleaverequests", doctorleaverequestsRouts);
app.use("/doctordashboard", doctordashboardRoutes);
app.use("/memberprofile", memberProfileRoutes);
app.use("/memberUpdate", memberUpdateRoutes);


//kithsandu
app.use("/memberDashboard", memberDashboardRoutes);
app.use("/memberDietPlan", memberDietPlanRoutes);
app.use("/memberAppointment", memberAppointmentRoutes);
app.use("/payments", paymentRoutes);

const port = config.server.port;

app.listen(port,  () => {
  console.log(`server is running on port ${port}.`);
});
