import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateToken";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
      return;
    }

    const token   = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.user      = decoded;
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Access denied, admin only",
    });
    return;
  }
  next();
};