import express from "express"
import { addReceptionist, deleteReceptionist, getAllReceptionists } from "../../controllers/manager/receptionist";


const router = express.Router()

router.get("/", getAllReceptionists);
router.post("/add", addReceptionist);
router.delete("/:receptionist_id", deleteReceptionist); 

export default router