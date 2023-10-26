import express from "express";
import {
  getProfileDetails,
  updateProfile,
} from "../../controllers/manager/profile";

const router = express.Router();

router.get("/:id", getProfileDetails);
router.put("/:id", updateProfile);

export default router;
