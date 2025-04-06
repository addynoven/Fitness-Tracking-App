import { getWeeklyDateRangeConfig } from "../utils/insight/dateRanges";
import { fetchWeeklyWorkoutFrequency } from "../utils/insight/activityAggregators/fetchWeeklyWorkoutFrequency";
import { processWeeklyWorkoutFrequency } from "../utils/insight/activityProcessors";
import dayjs from "dayjs";
import Activity from "../Models/Mongodb/Activity";

export const getWeeklyWorkoutFrequencyService = async (
	userId: string,
	date: Date
) => {
	const { startDate, endDate, labels, labelMap } =
		getWeeklyDateRangeConfig(date);

	const rawData = await fetchWeeklyWorkoutFrequency(userId, startDate, endDate);
	console.log("🟡 Step 2 - Raw Data from DB:", rawData);
	const frequencyData = processWeeklyWorkoutFrequency(
		rawData,
		labels,
		labelMap
	);
	console.log("🟡 Step 3 - Processed Frequency Data:", frequencyData);
	return {
		range: "week",
		labels,
		data: frequencyData,
	};
};

export const getDailyWorkoutFrequencyService = async (
	userId: string,
	date: Date
): Promise<number> => {
	const start = dayjs(date).startOf("day").toDate();
	const end = dayjs(date).endOf("day").toDate();

	const count = await Activity.countDocuments({
		userId,
		date: { $gte: start, $lte: end },
	});

	return count;
};
