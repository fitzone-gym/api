import express from 'express';

import {getAvailableNotices, getMemberCount} from '../../controllers/trainer/trainerDashboard'
const router = express.Router();

router.get('/', async(req, res) =>{
    res.send('dashboard');
})
router.get("/announcement", getAvailableNotices);
router.get("/totalMember/:user_id", getMemberCount);

export default router;