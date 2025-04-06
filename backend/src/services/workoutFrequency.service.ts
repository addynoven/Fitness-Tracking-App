import { getWeeklyDateRangeConfig } from "../utils/insight/dateRanges";
import { fetchWeeklyWorkoutFrequency } from "../utils/insight/activityAggregators/fetchWeeklyWorkoutFrequency";
import { processWeeklyWorkoutFrequency } from "../utils/insight/activityProcessors";

export const getWeeklyWorkoutFrequencyService = async (userId: string) => {
	const { startDate, endDate, labels, labelMap } = getWeeklyDateRangeConfig();

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
