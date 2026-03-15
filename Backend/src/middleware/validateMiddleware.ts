import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

export const registerSchema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters"),
  email:    z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email:    z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const bookingSchema = z.object({
  hotelId:  z.string().min(1, "Hotel ID is required"),
  checkIn:  z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  rooms:    z.number().min(1, "At least 1 room required"),
  guests:   z.number().min(1, "At least 1 guest required"),
});

export const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
      // ZodError has 'issues' property, not 'errors'.
      const errors = (result.error.issues as Array<{ path: (string | number)[]; message: string }>).map((e) => ({
        path: e.path.join('.'),
        message: e.message,
    }));

    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
    return;
  }

  next();
};