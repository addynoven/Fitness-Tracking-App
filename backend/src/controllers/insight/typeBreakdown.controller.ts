import asyncHandler from "../../middleware/asyncHandler";
import { getWorkoutTypeBreakdownService } from "../../services/TypeBreakdown.service";
import { parseInsightRange } from "../../utils/.utils.types";
import type { InsightRange } from "../../utils/.utils.types";
export const getWorkoutTypeBreakdown = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const date = req.query.date ? new Date(req.query.date as string) : new Date();
	const range: InsightRange = parseInsightRange(
		req.query.range as string | undefined
	);
	const insight = await getWorkoutTypeBreakdownService(userId, date, range);
	res.json(insight);
});
