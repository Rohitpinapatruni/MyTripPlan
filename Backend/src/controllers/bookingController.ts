import { Request, Response, NextFunction } from "express";
import Booking from "../models/Booking";
import Hotel   from "../models/Hotel";
import Trip    from "../models/Trip";
import { AppError } from "../middleware/errorMiddleware";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { hotelId, checkIn, checkOut, rooms, guests } = req.body;
    const userId = req.user?.id;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new AppError("Hotel not found", 404);
    }

    const checkInDate  = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) {
      throw new AppError("Check-out must be after check-in", 400);
    }

    const totalPrice = nights * rooms * hotel.pricePerNight;

    const booking = await Booking.create({
      userId,
      hotelId,
      checkIn:  checkInDate,
      checkOut: checkOutDate,
      rooms,
      guests,
      totalPrice,
      status: "confirmed",
    });

    // Add to trip or create new trip
    let trip = await Trip.findOne({ userId });
    if (!trip) {
      trip = await Trip.create({
        userId,
        bookings: [booking._id.toString()],
        totalCost: totalPrice,
      });
    } else {
      trip.bookings.push(booking._id.toString());
      trip.totalCost += totalPrice;
      await trip.save();
    }

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      data: { booking, nights, totalPrice },
    });

  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bookings = await Booking.find({ userId: req.user?.id })
      .populate("hotelId", "name location images pricePerNight rating")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings fetched",
      data: { count: bookings.length, bookings },
    });

  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    if (booking.userId.toString() !== req.user?.id) {
      throw new AppError("Not authorized to cancel this booking", 403);
    }

    if (booking.status === "cancelled") {
      throw new AppError("Booking is already cancelled", 400);
    }

    booking.status = "cancelled";
    await booking.save();

    await Trip.findOneAndUpdate(
      { userId: req.user?.id },
      { $inc: { totalCost: -booking.totalPrice } }
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled",
      data: { booking },
    });

  } catch (error) {
    next(error);
  }
};