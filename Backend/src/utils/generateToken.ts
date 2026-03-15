import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from "../types/index";

export const generateToken = (id: string, role: "user" | "admin"): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || "7d"
  };
  
  return jwt.sign(
    { id, role } as JwtPayload,
    process.env.JWT_SECRET as string,
    options
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
};