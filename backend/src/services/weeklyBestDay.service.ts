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

	// Aggregation: group by day of week (0=Sun, 6=Sat)
	const breakdown = await Activity.aggregate([
		{ $match: match },
		{
			$group: {
				_id: { $dayOfWeek: "$date" }, // Mongo: Sunday = 1, Saturday = 7
				count: { $sum: 1 },
			},
		},
		{ $sort: { count: -1 } },
	]);

	// Convert MongoDB 1–7 format to 0–6 (Sunday to Saturday)
	const dayMap = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const formatted = breakdown.map((entry) => {
		const mongoDay = entry._id; // 1-7
		const jsDayIndex = (mongoDay + 5) % 7; // Map 1-7 to 0-6
		return {
			day: dayMap[jsDayIndex],
			count: entry.count,
		};
	});

	const bestDay = formatted[0] || { day: null, count: 0 };

	return {
		range,
		bestDay,
		breakdown: formatted,
	};
};
