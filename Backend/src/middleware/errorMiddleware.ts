import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode    = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message    = err.message    || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 404;
    message    = "Resource not found";
  }

  if (err.code === 11000) {
    statusCode    = 400;
    const field   = Object.keys(err.keyValue)[0];
    message       = `${field} already exists`;
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message    = "Session expired, please login again";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message    = "Invalid token, please login again";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};