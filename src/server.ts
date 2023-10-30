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
import receptionistRoutes from "./routes/receptionist/receptionist";

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

import memberDetailsRoutesForTrainers from "./routes/trainer/memberDetails";
import dashboardRoutes from "./routes/trainer/trainerDashboard";
import memberDashboardRoutes from "./routes/member/dashboard";
import paymentDetailsRoutes from "./routes/trainer/paymentDetails";
import trainerProfileRoutes from "./routes/trainer/trainerProfile";

import memberDietPlanRoutes from "./routes/member/dietPlan";
import memberAppointmentRoutes from "./routes/member/appointment";

import paymentRoutes from "./routes/member/payments";

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

app.use("/receptionist", receptionistRoutes);
app.use("/memberDetails", membersRoutes);
app.use("/trainerDetails", trainerRoutes);

app.use("/auth", AuthRoutes);

app.use("/members", membersRoutes);
app.use("/trainers", trainerRoutes);
app.use("/announcement", announcementRoutes);
app.use("/doctor", doctorRoutes);
app.use("/receptionistDetails", receptionistDetailsRoutes);
app.use("/leaves", leavesRoutes);
app.use("/payment", paymentStaffRoutes);
app.use("/profile", profileRoutes);

app.use("/memberDetails", memberDetailsRoutes);

app.use("/dashboard", dashboardRoutes);
app.use("/memberDetailsForTrainers", memberDetailsRoutesForTrainers);
app.use("/payment", paymentDetailsRoutes);
app.use("/trainerProfile", trainerProfileRoutes);

app.use("/landingPage", landingPageRoute);
app.use("/contactUsSubmition", contactUs);

app.use("/ourTrainers", trainerDetailsRoutes);
app.use("/workoutSchedule", workoutScheduleRoutes);

app.use("/membersfordoctor", membersfordoctorRoutes);
app.use("/memberdoctorappointment", memberdoctorappointmentRoutes);
app.use("/doctorpayments", doctorpaymentRoutes);
app.use("/doctorleaverequests", doctorleaverequestsRouts);
app.use("/doctordashboard", doctordashboardRoutes);


//kithsandu
app.use("/memberDashboard", memberDashboardRoutes);
app.use("/memberDietPlan", memberDietPlanRoutes);
app.use("/memberAppointment", memberAppointmentRoutes);
app.use("/payments", paymentRoutes);

const port = config.server.port;

app.listen(5400, "0.0.0.0", () => {
  console.log(`server is running on port ${port}.`);
});
