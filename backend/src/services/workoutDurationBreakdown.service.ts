import Activity from "../Models/Mongodb/Activity";
import { Types } from "mongoose";
import {
	getMonthlyDateRangeConfig,
	getWeeklyDateRangeConfig,
} from "../utils/insight/dateRanges";
import type { InsightRange } from "../utils/.utils.types";

export const getWorkoutDurationBreakdownService = async (
	userId: string,
	baseDate: Date,
	range: InsightRange = "lifetime"
) => {
	const match: any = {
		userId: new Types.ObjectId(userId),
	};
	if (range === "week") {
		const { startDate, endDate } = getWeeklyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	} else if (range === "month") {
		const { startDate, endDate } = getMonthlyDateRangeConfig(baseDate);
		match.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
	}

	const rawData = await Activity.aggregate([
		{ $match: match },
		{
			$group: {
				_id: "$type",
				averageDuration: { $avg: "$duration" },
			},
		},
		{ $sort: { averageDuration: -1 } },
	]);

	const labels = rawData.map((item) => item._id);
	const data = rawData.map((item) =>
		parseFloat(item.averageDuration.toFixed(1))
	); // 1 decimal place

	return {
		range,
		labels,
		data,
	};
};
