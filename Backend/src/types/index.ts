import { Document } from "mongoose";
import { Types } from "mongoose";

// ─────────────────────────────
// 👤 USER
// ─────────────────────────────
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(enteredPassword: string): Promise<boolean>;
}

// ─────────────────────────────
// 🏨 HOTEL
// ─────────────────────────────
export interface IHotel {
  name: string;
  location: string;
  description: string;
  images: string[];
  amenities: string[];
  pricePerNight: number;
  totalRooms: number;
  rating: number;
  createdAt: Date;
  // _id is provided by Mongoose Document
}

export interface IHotelDocument extends Omit<IHotel, '_id'>, Document {
  _id: Types.ObjectId;
}

// ─────────────────────────────
// 📅 BOOKING
// ─────────────────────────────
export interface IBooking {
  userId: string;
  hotelId: string;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  // _id is provided by Mongoose Document
}

export interface IBookingDocument extends Omit<IBooking, '_id'>, Document {
  _id: Types.ObjectId;
}

// ─────────────────────────────
// 🗺️ TRIP
// ─────────────────────────────
export interface ITrip {
  userId: string;
  bookings: string[];
  totalCost: number;
  notes?: string;
  createdAt: Date;
  // _id is provided by Mongoose Document
}

export interface ITripDocument extends Omit<ITrip, '_id'>, Document {
  _id: Types.ObjectId;
}

// ─────────────────────────────
// 🔐 AUTH
// ─────────────────────────────
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
}

// ─────────────────────────────
// 🔑 JWT
// ─────────────────────────────
export interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

// ─────────────────────────────
// 📦 API Response
// ─────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}