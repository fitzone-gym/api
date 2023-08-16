import express from 'express';

import {getAvailableNotices, getMemberCount} from '../controllers/trainerDashboard'
const router = express.Router();

router.get('/', async(req, res) =>{
    res.send('dashboard');
})
router.get("/announcement", getAvailableNotices);
router.get("/totalMember", getMemberCount);

export default router;