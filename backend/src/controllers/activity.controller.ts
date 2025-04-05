import asyncHandler from "../middleware/asyncHandler";
import type { Request, Response, NextFunction } from "express";
import Activity from "../Models/Mongodb/Activity";

// Create activity
export const createActivity = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const activity = await Activity.create({ ...req.body, userId });
		res.status(201).json(activity);
	}
);

// Get all activities for the user
export const getAllActivities = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const activities = await Activity.find({ userId });
		res.json(activities);
	}
);

// Get one activity
export const getActivityById = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		const activityId = req.params.id;

		const activity = await Activity.findOne({ _id: activityId, userId });
		if (!activity)
			return res.status(404).json({ message: "Activity not found" });

		res.json(activity);
	}
);

// Update activity
export const updateActivity = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		const activityId = req.params.id;

		const activity = await Activity.findOneAndUpdate(
			{ _id: activityId, userId },
			{ ...req.body },
			{ new: true }
		);

		if (!activity)
			return res
				.status(404)
				.json({ message: "Activity not found or unauthorized" });
		res.json(activity);
	}
);

// Delete activity
export const deleteActivity = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		const activityId = req.params.id;

		const activity = await Activity.findOneAndDelete({
			_id: activityId,
			userId,
		});
		if (!activity)
			return res
				.status(404)
				.json({ message: "Activity not found or unauthorized" });

		res.json({ message: "Activity deleted" });
	}
);
