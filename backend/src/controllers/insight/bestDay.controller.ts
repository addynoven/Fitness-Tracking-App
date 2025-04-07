import asyncHandler from "../../middleware/asyncHandler";
import { getBestDayService } from "../../services/weeklyBestDay.service";
import { parseInsightRange } from "../../utils/.utils.types";
import type { InsightRange } from "../../utils/.utils.types";
export const getBestDay = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const baseDate = req.query.date
		? new Date(req.query.date as string)
		: new Date();
	const rangeQuery = (req.query.range as string)?.toLowerCase() || "lifetime";
	const range: InsightRange = parseInsightRange(
		rangeQuery as string | undefined
	);

	const insight = await getBestDayService(userId, baseDate, range);
	res.json(insight);
});
