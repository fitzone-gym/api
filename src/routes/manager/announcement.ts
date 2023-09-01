import express from "express"
import { addAnnouncement, deleteAnnouncement, getAllAnnouncement, updateAnnouncement } from "../../controllers/manager/announcement";

const router = express.Router()

router.get("/", getAllAnnouncement);
router.put("/update/:announcement_id", updateAnnouncement);
router.delete("/delete/:announcement_id", deleteAnnouncement);
router.post("/add", addAnnouncement);


export default router