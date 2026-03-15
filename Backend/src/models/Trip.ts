import mongoose, { Schema } from "mongoose";
import { ITripDocument } from "../types/index";

const TripSchema = new Schema<ITripDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: "User",
      required: true,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    totalCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model<ITripDocument>("Trip", TripSchema);
export default Trip;