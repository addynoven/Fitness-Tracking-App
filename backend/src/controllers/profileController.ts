import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import UserProfile from "../Models/Mongodb/UserProfile";

export const getAuthenticatedUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		res.json(req.user);
	}
);

// Create or update user profile
export const createOrUpdateProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const { age, weight, height, fitnessGoals } = req.body;
		const userId = req.user?.id; // Extracted from auth middleware

		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const profile = await UserProfile.findOneAndUpdate(
			{ userId },
			{ age, weight, height, fitnessGoals },
			{ new: true, upsert: true }
		);
		res.json(profile);
	}
);

// Get user profile
export const getUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;

		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const profile = await UserProfile.findOne({ userId });
		if (!profile) return res.status(404).json({ message: "Profile not found" });

		res.json(profile);
	}
);
