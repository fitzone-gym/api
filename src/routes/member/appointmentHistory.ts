import express from 'express';
import{
    getMemberAppointmentHistory
}from"../../controllers/member/appointmentHistory";

const router = express.Router();

router.get('/:id',getMemberAppointmentHistory)

export default router