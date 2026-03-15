import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { AppError } from "../middleware/errorMiddleware";
import { RegisterInput, LoginInput } from "../types/index";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body as RegisterInput;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already registered", 400);
    }

    const user  = await User.create({ name, email, password });
    if(!user._id) {
      throw new AppError("User registration failed", 500);
    }
    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        token,
        user: {
          _id:   user._id,
          name:  user.name,
          email: user.email,
          role:  user.role,
        },
      },
    });

  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as LoginInput;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }
    if(!user._id) {
      throw new AppError("User login failed", 500);
    }
    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          _id:   user._id,
          name:  user.name,
          email: user.email,
          role:  user.role,
        },
      },
    });

  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "User fetched",
      data: { user },
    });

  } catch (error) {
    next(error);
  }
};