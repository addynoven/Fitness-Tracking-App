import asyncHandler from "../../middleware/asyncHandler";
import {
	getDailyWorkoutFrequencyService,
	getWeeklyWorkoutFrequencyService,
} from "../../services/workoutFrequency.service";

export const getWeeklyWorkoutFrequency = asyncHandler(async (req, res) => {
	const userId = req.user?.id;
	const date = req.query.date ? new Date(req.query.date as string) : new Date();
	const insight = await getWeeklyWorkoutFrequencyService(userId, date);
	res.json(insight);
});

export const getDailyWorkoutFrequency = asyncHandler(async (req, res) => {
	const userId = req.user!.id as string;
	const date = req.query.date ? new Date(req.query.date as string) : new Date();

	const count = await getDailyWorkoutFrequencyService(userId, date);

	res.json({
		date: date.toISOString().split("T")[0],
		count,
	});
});

export const getMonthlyWorkoutFrequency = asyncHandler(async (req, res) => {
	const userId = req.user?.id;
	const date = req.query.date ? new Date(req.query.date as string) : new Date();
	const insight = await getWeeklyWorkoutFrequencyService(userId, date);
	res.json(insight);
});
