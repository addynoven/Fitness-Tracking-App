// controllers/insightController.ts
import asyncHandler from "../middleware/asyncHandler";
import type { Request, Response } from "express";
import Activity from "../Models/Mongodb/Activity";
import dayjs from "dayjs";

export const getWeeklyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		// Get the start of the current week (Monday)
		const startOfWeek = dayjs().startOf("week").add(1, "day"); // startOf("week") is Sunday, so +1 = Monday
		const endOfWeek = dayjs(startOfWeek).add(6, "day").endOf("day");

		const rawData = await Activity.aggregate([
			{
				$match: {
					userId: { $eq: userId },
					createdAt: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() },
				},
			},
			{
				$group: {
					_id: { $dayOfWeek: "$createdAt" }, // 1 = Sunday, 2 = Monday, ..., 7 = Saturday
					totalCalories: { $sum: "$caloriesBurned" },
				},
			},
		]);

		const weekdayMap = {
			1: "Sun",
			2: "Mon",
			3: "Tue",
			4: "Wed",
			5: "Thu",
			6: "Fri",
			7: "Sat",
		};

		const dayIndexMap = {
			Sun: 0,
			Mon: 1,
			Tue: 2,
			Wed: 3,
			Thu: 4,
			Fri: 5,
			Sat: 6,
		};

		const caloriesPerDay: number[] = new Array(7).fill(0);

		for (const entry of rawData) {
			const label = weekdayMap[
				entry._id as keyof typeof weekdayMap
			] as keyof typeof dayIndexMap;
			const index = dayIndexMap[label];
			caloriesPerDay[index] = entry.totalCalories;
		}

		const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		const data = labels.map((label) => {
			const idx = dayIndexMap[label as keyof typeof dayIndexMap];
			return caloriesPerDay[idx] || 0;
		});

		const totalCalories = data.reduce((a, b) => a + b, 0);

		res.json({
			labels,
			data,
			totalCalories,
		});
	}
);
