import asyncHandler from "../../middleware/asyncHandler";
import { getGoalProgressTrackerService } from "../../services/goalProgress.service";

export const getGoalProgressTracker = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const date = req.query.date ? new Date(req.query.date as string) : new Date();
	const insight = await getGoalProgressTrackerService(userId, date);
	res.json(insight);
});
