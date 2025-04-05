import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
	createOrUpdateProfile,
	getAuthenticatedUser,
	getUserProfile,
} from "../controllers/profile.controller";

const router = Router();

router.post("/profile", authMiddleware, createOrUpdateProfile);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/me", authMiddleware, getAuthenticatedUser);
export default router;
