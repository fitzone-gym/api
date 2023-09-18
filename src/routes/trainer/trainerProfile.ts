import express from "express";
import {getProfileDetails, getExtraDetails} from "../../controllers/trainer/trainerProfile";

const router =  express.Router();

router.get("/details/:user_id",getProfileDetails);
router.get("/extraDetails/:user_id",getExtraDetails);

export default router;