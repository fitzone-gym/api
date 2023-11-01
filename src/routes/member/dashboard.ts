import express from 'express';
import{
    getMemberDietDetails
}from"../../controllers/member/dashboard";

const router = express.Router();

router.get('/:id',getMemberDietDetails)

export default router