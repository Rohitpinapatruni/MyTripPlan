import { Request, Response, NextFunction } from "express";
import Hotel from "../models/Hotel";
import { AppError } from "../middleware/errorMiddleware";
import { ApiFeatures } from "../utils/apiFeatures";

export const getHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const features = new ApiFeatures(Hotel.find(), req.query)
      .search()
      .filter()
      .paginate();

    const hotels = await features.query;
    const total  = await Hotel.countDocuments();

    res.status(200).json({
      success: true,
      message: "Hotels fetched",
      data: { total, count: hotels.length, hotels },
    });

  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      throw new AppError("Hotel not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Hotel fetched",
      data: { hotel },
    });

  } catch (error) {
    next(error);
  }
};

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hotel created",
      data: { hotel },
    });

  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!hotel) {
      throw new AppError("Hotel not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Hotel updated",
      data: { hotel },
    });

  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      throw new AppError("Hotel not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Hotel deleted",
      data: null,
    });

  } catch (error) {
    next(error);
  }
};