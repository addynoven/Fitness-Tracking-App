// src/services/insight/getBestDayService.ts

import { Types } from "mongoose";
import Activity from "../Models/Mongodb/Activity";
import {
	getWeeklyDateRangeConfig,
	getMonthlyDateRangeConfig,
} from "../utils/insight/dateRanges";
import type { InsightRange } from "../utils/.utils.types";

export const getBestDayService = async (
	userId: string,
	baseDate: Date,
	range: InsightRange = "lifetime"
) => {
	const userObjectId = new Types.ObjectId(userId);

	// Build date range filter
	let match: any = { userId: userObjectId };
	if (range === "week") {
		const { startDate, endDate } = getWeeklyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	} else if (range === "month") {
		const { startDate, endDate } = getMonthlyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	}

	// Aggregation: group by day of week (Mongo: 1=Sunday, 7=Saturday)
	const breakdown = await Activity.aggregate([
		{ $match: match },
		{
			$group: {
				_id: { $dayOfWeek: "$date" },
				count: { $sum: 1 },
			},
		},
		{ $sort: { count: -1 } },
	]);

	// Map MongoDB day numbers (1–7) to JS-style Mon–Sun index (0–6)
	const dayMap = [
		"Monday", // 0
		"Tuesday", // 1
		"Wednesday", // 2
		"Thursday", // 3
		"Friday", // 4
		"Saturday", // 5
		"Sunday", // 6
	];

	const rawFormatted = breakdown.map((entry) => {
		const mongoDay = entry._id;
		const jsDayIndex = (mongoDay + 5) % 7;
		return {
			day: dayMap[jsDayIndex],
			count: entry.count,
		};
	});

	// Best day comes from top of rawFormatted (sorted by count descending)
	const bestDay = rawFormatted[0] || { day: null, count: 0 };

	// Re-sort for frontend chart display (Mon to Sun)
	const formatted = [...rawFormatted].sort(
		(a, b) => dayMap.indexOf(a.day || "") - dayMap.indexOf(b.day || "")
	);

	return {
		range,
		bestDay,
		breakdown: formatted,
	};
};
