import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";

// Routes
import authRoutes    from "./routes/authRoutes";
import hotelRoutes   from "./routes/hotelRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import tripRoutes    from "./routes/tripRoutes";

// 1. Load env variables FIRST
dotenv.config();

// 2. Connect to MongoDB
connectDB();

// 3. Initialize Express
const app: Application = express();
const PORT = process.env.PORT || 5000;

// 4. Global Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Health Check
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "🏨 Hotel Booking API is running",
  });
});

// 6. Mount Routes
app.use("/api/auth",     authRoutes);
app.use("/api/hotels",   hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/trips",    tripRoutes);

// 7. 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// 8. Error Handler — MUST be last
app.use(errorHandler);

// 9. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;