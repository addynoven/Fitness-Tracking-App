// src/services/insight/getWorkoutTypeBreakdownService.ts
import Activity from "../Models/Mongodb/Activity";
import { Types } from "mongoose";
import {
	getMonthlyDateRangeConfig,
	getWeeklyDateRangeConfig,
} from "../utils/insight/dateRanges";
import type { InsightRange } from "../utils/.utils.types";

export const getWorkoutTypeBreakdownService = async (
	userId: string,
	baseDate: Date,
	range = "lifetime" as InsightRange
) => {
	// Build the match object with user filter
	let match: any = { userId: new Types.ObjectId(userId) };

	// Apply date filters for weekly or monthly ranges
	if (range === "week") {
		const { startDate, endDate } = getWeeklyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	} else if (range === "month") {
		const { startDate, endDate } = getMonthlyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	}

	// Aggregate by workout type
	const rawData = await Activity.aggregate([
		{ $match: match },
		{
			$group: {
				_id: "$type",
				count: { $sum: 1 },
			},
		},
		{ $sort: { count: -1 } },
	]);

	// Format output for charting
	const labels = rawData.map((item) => item._id);
	const data = rawData.map((item) => item.count);

	return { range, labels, data };
};
