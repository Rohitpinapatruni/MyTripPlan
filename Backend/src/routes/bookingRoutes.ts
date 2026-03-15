import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController";
import { protect } from "../middleware/authMiddleware";
import { validate, bookingSchema } from "../middleware/validateMiddleware";

const router = express.Router();

router.use(protect);

router.post("/",    validate(bookingSchema), createBooking);
router.get("/me",   getMyBookings);
router.delete("/:id", cancelBooking);

export default router;