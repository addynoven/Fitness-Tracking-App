import asyncHandler from "../../middleware/asyncHandler";
import { getWeeklyWorkoutFrequencyService } from "../../services/workoutFrequency.service";

export const getWeeklyWorkoutFrequency = asyncHandler(async (req, res) => {
	const userId = req.user?.id;
	const insight = await getWeeklyWorkoutFrequencyService(userId);
	res.json(insight);
});
