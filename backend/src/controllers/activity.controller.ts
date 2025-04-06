import asyncHandler from "../middleware/asyncHandler";
import type { Request, Response } from "express";
import {
	handleCreateActivity,
	handleGetAllActivities,
	handleGetActivityById,
	handleUpdateActivity,
	handleDeleteActivity,
} from "../services/activity.service";

export const createActivity = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const activity = await handleCreateActivity(userId, req.body);
		res.status(201).json(activity);
	}
);

export const getAllActivities = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const activities = await handleGetAllActivities(userId);
		res.json(activities);
	}
);

export const getActivityById = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		const activityId = req.params?.id;
		if (!activityId)
			return res.status(400).json({ message: "Activity ID is required" });

		const activity = await handleGetActivityById(userId, activityId);
		if (!activity)
			return res.status(404).json({ message: "Activity not found" });

		res.json(activity);
	}
);

export const updateActivity = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		const activityId = req.params?.id;
		if (!activityId)
			return res.status(400).json({ message: "Activity ID is required" });
		const activity = await handleUpdateActivity(userId, activityId, req.body);
		if (!activity)
			return res
				.status(404)
				.json({ message: "Activity not found or unauthorized" });

		res.json(activity);
	}
);

export const deleteActivity = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		const activityId = req.params?.id;
		if (!activityId)
			return res.status(400).json({ message: "Activity ID is required" });
		const deleted = await handleDeleteActivity(userId, activityId);
		if (!deleted)
			return res
				.status(404)
				.json({ message: "Activity not found or unauthorized" });

		res.json({ message: "Activity deleted" });
	}
);
