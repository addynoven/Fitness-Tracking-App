import { Types } from "mongoose";
import Activity from "../Models/Mongodb/Activity";
import { Goal } from "../Models/Mongodb/Goal";
import {
	getMonthlyDateRangeConfig,
	getWeeklyDateRangeConfig,
} from "../utils/insight/dateRanges";
import type { InsightRange } from "../utils/.utils.types";
import { AppError } from "../utils/error";

export const getGoalProgressTrackerService = async (
	userId: string,
	baseDate: Date,
	range: InsightRange = "lifetime"
) => {
	const userObjectId = new Types.ObjectId(userId);

	// Match config
	const match: any = { userId: userObjectId };
	if (range === "week") {
		const { startDate, endDate } = getWeeklyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	} else if (range === "month") {
		const { startDate, endDate } = getMonthlyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	}

	// Aggregate activity data
	const [summary] = await Activity.aggregate([
		{ $match: match },
		{
			$group: {
				_id: null,
				totalCalories: { $sum: "$caloriesBurned" },
				totalDuration: { $sum: "$duration" },
				totalWorkouts: { $sum: 1 },
			},
		},
	]);

	// Fetch goal
	const goals = await Goal.findOne({ user: userObjectId });
	if (!goals) throw new AppError("Goal not set for this user.");

	const calories = summary?.totalCalories ?? 0;
	const duration = summary?.totalDuration ?? 0;
	const workoutCount = summary?.totalWorkouts ?? 0;

	// Helper to calculate percentage
	const toPercentage = (progress: number, goal: number) =>
		goal > 0 ? Math.min(100, Math.round((progress / goal) * 100)) : 0;

	return {
		range,
		calories: {
			goal: goals.caloriesGoal,
			progress: calories,
			percentage: toPercentage(calories, goals.caloriesGoal),
		},
		workouts: {
			goal: goals.workoutsGoal,
			progress: workoutCount,
			percentage: toPercentage(workoutCount, goals.workoutsGoal),
		},
		duration: {
			goal: goals.durationGoal,
			progress: duration,
			percentage: toPercentage(duration, goals.durationGoal),
		},
	};
};
