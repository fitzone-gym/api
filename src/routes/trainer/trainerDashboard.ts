import express from 'express';

import {getAvailableNotices, getMemberCount, getUpNextAppointment} from '../../controllers/trainer/trainerDashboard'
const router = express.Router();

router.get('/', async(req, res) =>{
    res.send('dashboard');
})
router.get("/announcement", getAvailableNotices);
router.get("/totalMember/:user_id", getMemberCount);
router.get("/upNextAppointment/:user_id", getUpNextAppointment);

export default router;