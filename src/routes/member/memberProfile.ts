import express from "express"
import{
    getMemberProfile,
    getMemberPackageDetails,
    getMemberHealthDetails,
    getMemberTrainerDetails
} from "../../controllers/memberprofile";

const router = express.Router();

router.get('/profileDetails/:user_id', getMemberProfile);
router.get('/packageDetails/:user_id', getMemberPackageDetails);
router.get('/healthDetails/:user_id', getMemberHealthDetails);
router.get('/trainerDetails/:user_id', getMemberTrainerDetails);

export default router