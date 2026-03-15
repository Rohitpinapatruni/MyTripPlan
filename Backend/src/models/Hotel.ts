import mongoose, { Schema } from "mongoose";
import { IHotelDocument } from "../types/index";

const HotelSchema = new Schema<IHotelDocument>(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: [0, "Price cannot be negative"],
    },
    totalRooms: {
      type: Number,
      required: [true, "Total rooms is required"],
      min: [1, "Must have at least 1 room"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
HotelSchema.index({ name: "text", location: "text" });

const Hotel = mongoose.model<IHotelDocument>("Hotel", HotelSchema);
export default Hotel;