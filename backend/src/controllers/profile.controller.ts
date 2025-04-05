import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import UserProfile from "../Models/Mongodb/UserProfile";

// (get) -> /me endpoint
export const getAuthenticatedUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		res.json(req.user);
	}
);

// Create or update user profile (post) -> /profile endpoint
export const createOrUpdateProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const {
			age,
			weight,
			height,
			fitnessGoals,
			gender,
			activityLevel,
			dietaryPreferences,
		} = req.body;

		const userId = req.user?.id;

		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const parsedPreferences = Array.isArray(dietaryPreferences)
			? dietaryPreferences
			: dietaryPreferences?.split(",").map((s: string) => s.trim());

		const profile = await UserProfile.findOneAndUpdate(
			{ userId },
			{
				age: Number(age),
				weight: Number(weight),
				height: Number(height),
				fitnessGoals,
				gender,
				activityLevel,
				dietaryPreferences: parsedPreferences,
			},
			{ new: true, upsert: true }
		);

		res.json(profile);
	}
);

// Get user profile (get) -> /profile endpoint
export const getUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const profile = await UserProfile.findOne({ userId }).populate(
			"activities"
		);

		if (!profile) return res.status(404).json({ message: "Profile not found" });

		res.json(profile);
	}
);
