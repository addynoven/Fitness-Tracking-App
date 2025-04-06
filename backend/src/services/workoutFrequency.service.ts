import { getWeeklyDateRangeConfig } from "../utils/insight/dateRanges";
import { fetchWeeklyWorkoutFrequency } from "../utils/insight/activityAggregators/fetchWeeklyWorkoutFrequency";
import { processWeeklyWorkoutFrequency } from "../utils/insight/activityProcessors";
import type { Dayjs } from "dayjs";

export const getWeeklyWorkoutFrequencyService = async (userId: string) => {
	const {
		startDate,
		endDate,
		labels,
		labelMap,
	}: {
		startDate: Dayjs;
		endDate: Dayjs;
		labels: string[];
		labelMap: Record<string, number>;
	} = getWeeklyDateRangeConfig();

	// console.log(
	// 	"🟡 Step 1 - Date Range:",
	// 	startDate.format("YYYY-MM-DD"),
	// 	endDate.format("YYYY-MM-DD")
	// );

	const rawData = await fetchWeeklyWorkoutFrequency(
		userId,
		startDate.toDate(),
		endDate.toDate()
	);
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
