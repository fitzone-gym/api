import express from "express";
import {
  contactUsRequestView,
  contactUsFormReplySubmition,
} from "../../controllers/receptionist/contactUs";

const router = express.Router();

router.get("/", contactUsRequestView);
router.post("/contactUsFormReplySubmition", contactUsFormReplySubmition);


export default router;
