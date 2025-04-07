import asyncHandler from "../../middleware/asyncHandler";
import { getMonthlyComparisonService } from "../../services/Comparison.service";

export const getMonthlyComparison = asyncHandler(async (req, res) => {
	const userId = req.user!.id as string;
	// Use provided date or default to today
	const baseDate = req.query.date
		? new Date(req.query.date as string)
		: new Date();

	const insight = await getMonthlyComparisonService(userId, baseDate);
	res.json(insight);
});
