import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
	handleGetAuthenticatedUser,
	handleCreateOrUpdateProfile,
	handleGetUserProfile,
} from "../services/profile.service";

// (get) /me
export const getAuthenticatedUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = handleGetAuthenticatedUser(req);
		if (!result) return res.status(401).json({ error: "Unauthorized" });
		res.json(result);
	}
);

// (post) /profile
export const createOrUpdateProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const profile = await handleCreateOrUpdateProfile(userId, req.body);
		res.json(profile);
	}
);

// (get) /profile
export const getUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const profile = await handleGetUserProfile(userId);
		if (!profile) return res.status(404).json({ message: "Profile not found" });

		res.json(profile);
	}
);
