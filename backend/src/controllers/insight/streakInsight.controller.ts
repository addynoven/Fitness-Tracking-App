import asyncHandler from "../../middleware/asyncHandler";
import { getStreakInsightService } from "../../services/streakInsight.service";
import { parseInsightRange } from "../../utils/.utils.types";
import type { InsightRange } from "../../utils/.utils.types";
export const streakInsight = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const baseDate = req.query.date
		? new Date(req.query.date as string)
		: new Date();
	const rangeQuery = (req.query.range as string)?.toLowerCase() || "lifetime";
	const range: InsightRange = parseInsightRange(
		rangeQuery as string | undefined
	);
	const insight = await getStreakInsightService(userId);
	res.json(insight);
});
