import express from 'express';
import{
    getMemberAppointment
}from"../../controllers/member/appointment";

const router = express.Router();

router.get('/:id',getMemberAppointment)

export default router