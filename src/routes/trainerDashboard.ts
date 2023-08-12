import express from 'express';
import {getAvailableNotices} from '../controllers/trainerDashboard'
const router = express.Router();

router.get('/', async(req, res) =>{
    res.send('dashboard');
})
router.get("/announcement", getAvailableNotices);

export default router;