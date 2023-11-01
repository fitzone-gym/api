import express from 'express';
import{
    getMemberDetails,
    
}from"../../controllers/member/dietPlan";

const router = express.Router();

router.get('/:user_id',getMemberDetails)

export default router