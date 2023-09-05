import express from "express"
import { addAnnouncement, deleteAnnouncement, getAllAnnouncement, updateAnnouncement , getAnnouncements_Receptionist} from "../controllers/announcement";

const router = express.Router()

router.get("/", getAllAnnouncement);
router.put("/update/:announcement_id", updateAnnouncement);
router.delete("/delete/:announcement_id", deleteAnnouncement);
router.post("/add", addAnnouncement);
router.get("/receptionist" , getAnnouncements_Receptionist)

export default router