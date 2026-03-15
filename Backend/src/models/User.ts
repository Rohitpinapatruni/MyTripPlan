import mongoose, { Schema, CallbackWithoutResultAndOptionalError } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../types/index";

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  }
);

// ─────────────────────────────
// Hash password BEFORE saving
// ─────────────────────────────
UserSchema.pre("save", async function (this: IUserDocument, next: any) {
  if (!this.isModified("password")) return next(); // only hash if changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─────────────────────────────
// Method to compare passwords
// ─────────────────────────────
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUserDocument>("User", UserSchema);
export default User;