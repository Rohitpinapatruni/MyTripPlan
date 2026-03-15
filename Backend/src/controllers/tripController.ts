import { Request, Response, NextFunction } from "express";
import Trip from "../models/Trip";
import { AppError } from "../middleware/errorMiddleware";

export const getMyTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const trip = await Trip.findOne({ userId: req.user?.id })
      .populate({
        path: "bookings",
        populate: {
          path:   "hotelId",
          select: "name location images pricePerNight rating",
        },
      });

    if (!trip) {
      throw new AppError("No trip found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Trip fetched",
      data: { trip },
    });

  } catch (error) {
    next(error);
  }
};

export const getTripById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const trip = await Trip.findById(req.params.id).populate({
      path: "bookings",
      populate: {
        path:   "hotelId",
        select: "name location images pricePerNight rating",
      },
    });

    if (!trip) {
      throw new AppError("Trip not found", 404);
    }

    if (trip.userId.toString() !== req.user?.id) {
      throw new AppError("Not authorized to view this trip", 403);
    }

    res.status(200).json({
      success: true,
      message: "Trip fetched",
      data: { trip },
    });

  } catch (error) {
    next(error);
  }
};