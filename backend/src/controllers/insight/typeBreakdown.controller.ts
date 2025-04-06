import asyncHandler from "../../middleware/asyncHandler";
import { getWorkoutTypeBreakdownService } from "../../services/TypeBreakdown.service";
export const getWorkoutTypeBreakdown = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const date = req.query.date ? new Date(req.query.date as string) : new Date();

	const insight = await getWorkoutTypeBreakdownService(userId, date);
	res.json(insight);
});
