import express from "express";
import { register, login, getMe } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";
import { validate, registerSchema, loginSchema } from "../middleware/validateMiddleware";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login",    validate(loginSchema),    login);
router.get("/me",        protect,                  getMe);

export default router;