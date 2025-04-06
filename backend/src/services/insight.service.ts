import {
	getDailyDateRangeConfig,
	getMonthlyDateRangeConfig,
	getWeeklyDateRangeConfig,
	getYearlyDateRangeConfig,
} from "../utils/insight/dateRanges";
import {
	fetchDailyActivityData,
	fetchMonthlyActivityData,
	fetchWeeklyActivityData,
	fetchYearlyActivityData,
} from "../utils/insight/activityAggregators";
import {
	calculateTotalCalories,
	processDailyData,
	processMonthlyData,
	processWeeklyData,
	processYearlyData,
} from "../utils/insight/activityProcessors";

// -------- Public Services --------

export const getWeeklyCaloriesInsightService = async (userId: string) => {
	const { startDate, endDate, labels, labelMap } = getWeeklyDateRangeConfig();
	const rawData = await fetchWeeklyActivityData(userId, startDate, endDate);
	const data = processWeeklyData(rawData, labels, labelMap);
	const totalCalories = calculateTotalCalories(data);

	return {
		range: "week",
		labels,
		data,
		totalCalories,
	};
};

export const getDailyCaloriesInsightService = async (userId: string) => {
	const { startDate, endDate, labels, labelMap } = getDailyDateRangeConfig();
	const rawData = await fetchDailyActivityData(userId, startDate, endDate);
	const data = processDailyData(rawData, labels, labelMap);
	const totalCalories = calculateTotalCalories(data);

	return {
		range: "day",
		labels,
		data,
		totalCalories,
	};
};

export const getMonthlyCaloriesInsightService = async (userId: string) => {
	const { startDate, endDate, labels, labelMap } = getMonthlyDateRangeConfig();
	const rawData = await fetchMonthlyActivityData(userId, startDate, endDate);
	const data = processMonthlyData(rawData, startDate, labelMap);
	const totalCalories = calculateTotalCalories(data);

	return {
		range: "month",
		labels,
		data,
		totalCalories,
	};
};

export const getYearlyCaloriesInsightService = async (userId: string) => {
	const { startDate, endDate, labels, labelMap } = getYearlyDateRangeConfig();
	const rawData = await fetchYearlyActivityData(userId, startDate, endDate);
	const data = processYearlyData(rawData, labelMap);
	const totalCalories = calculateTotalCalories(data);

	return {
		range: "year",
		labels,
		data,
		totalCalories,
	};
};
