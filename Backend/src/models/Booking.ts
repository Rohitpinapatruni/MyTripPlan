import mongoose, { Schema } from "mongoose";
import { IBookingDocument } from "../types/index";

const BookingSchema = new Schema<IBookingDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: "User",
      required: true,
    },
    hotelId: {
      type: Schema.Types.ObjectId as any,
      ref: "Hotel",
      required: true,
    },
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    rooms: {
      type: Number,
      required: true,
      min: [1, "Must book at least 1 room"],
    },
    guests: {
      type: Number,
      required: true,
      min: [1, "Must have at least 1 guest"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Validate checkOut is after checkIn
BookingSchema.pre("save", function (next) {
  const self = this as any;
  if (self.checkOut <= self.checkIn) {
    (next as Function)(new Error("Check-out date must be after check-in date"));
    return;
  }
  (next as Function)();
  return;
});

const Booking = mongoose.model<IBookingDocument>("Booking", BookingSchema);
export default Booking;