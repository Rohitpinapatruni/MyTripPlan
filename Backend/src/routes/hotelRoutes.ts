import express from "express";
import {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

// GET /api/hotels          → public
// POST /api/hotels         → admin only
router
  .route("/")
  .get(getHotels)
  .post(protect, adminOnly, createHotel);

// GET /api/hotels/:id      → public
// PUT /api/hotels/:id      → admin only
// DELETE /api/hotels/:id   → admin only
router
  .route("/:id")
  .get(getHotelById)
  .put(protect, adminOnly, updateHotel)
  .delete(protect, adminOnly, deleteHotel);

export default router;