import express from 'express';
import{
    getMemberAppointment
}from"../../controllers/member/appointment";

const router = express.Router();

router.get('/',getMemberAppointment)

export default router