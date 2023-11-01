import express from "express"
import {get_all_events} from '../../controllers/receptionist/events';
import {get_current_events} from '../../controllers/receptionist/events';
import {addevent} from '../../controllers/receptionist/events';

const router = express.Router()

router.get("/", get_all_events);
router.get("/currentevents", get_current_events);
router.get("/addevent", addevent);

export default router