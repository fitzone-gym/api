import express from "express"
import {
  getCountsForCounterSection,
  getTrainerDetails,
  getUserFeedbacksForTestimonial,
  contactUsFormSubmition,
} from "../../controllers/users/landingPage";

const router = express.Router()

router.get("/", getCountsForCounterSection);
router.get("/getTrainerDetails", getTrainerDetails);
router.get("/getUserFeedbacksForTestimonial", getUserFeedbacksForTestimonial);
router.post("/contactUsFormSubmition", contactUsFormSubmition);
export default router


