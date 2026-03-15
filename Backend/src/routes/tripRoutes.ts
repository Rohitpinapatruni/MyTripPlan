import express from "express";
import { getMyTrip, getTripById } from "../controllers/tripController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.use(protect);

router.get("/me",  getMyTrip);
router.get("/:id", getTripById);

export default router;