import express from "express"
import {addMemberattendence} from '../../controllers/receptionist/member_attendence';


const router = express.Router()

router.get("/add", addMemberattendence);


export default router