import asyncHandler from "../../middleware/asyncHandler";
import { getWeightTrendInsight } from "../../services/weightInsight.service";
export const weightTrend = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const insight = await getWeightTrendInsight(userId);
	res.json(insight);
});
