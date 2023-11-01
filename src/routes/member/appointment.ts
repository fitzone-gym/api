import express from 'express';
import{
    getMemberAppointment
}from"../../controllers/member/appointment";

const router = express.Router();

router.post('/',getMemberAppointment)

export default router