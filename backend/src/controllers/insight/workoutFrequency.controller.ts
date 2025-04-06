import asyncHandler from "../../middleware/asyncHandler";
import { getWeeklyWorkoutFrequencyService } from "../../services/workoutFrequency.service";

export const getWeeklyWorkoutFrequency = asyncHandler(async (req, res) => {
	console.log("getWeeklyWorkoutFrequency called");
	const userId = req.user?.id;
	const insight = await getWeeklyWorkoutFrequencyService(userId);
	res.json(insight);
});
