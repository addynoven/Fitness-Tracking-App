import dayjs from "dayjs";

export function processWeeklyData(
	rawData: any[],
	labelMap: Record<string, number>
): number[] {
	const weeklyData = new Array(7).fill(0);
	const weekdayMap: Record<number, string> = {
		1: "Sun",
		2: "Mon",
		3: "Tue",
		4: "Wed",
		5: "Thu",
		6: "Fri",
		7: "Sat",
	};

	rawData.forEach((entry) => {
		const dayLabel = weekdayMap[entry._id] || "Unknown";
		const idx = labelMap[dayLabel];
		if (idx !== undefined) {
			weeklyData[idx] = entry.totalCalories;
		}
	});

	return weeklyData;
}

export function processDailyData(
	rawData: any[],
	labels: string[],
	labelMap: Record<string, number>
): number[] {
	const dailyData = new Array(24).fill(0);
	rawData.forEach((entry) => {
		const label = `${entry._id}:00`;
		const idx = labelMap[label];
		if (idx !== undefined) dailyData[idx] = entry.totalCalories;
	});
	return dailyData;
}

export function processMonthlyData(
	rawData: any[],
	startDate: dayjs.Dayjs,
	labelMap: Record<string, number>
): number[] {
	const totalDays = startDate.daysInMonth();
	const monthlyData = new Array(totalDays).fill(0);

	rawData.forEach((entry) => {
		const label = startDate.date(entry._id).format("MMM D");
		const idx = labelMap[label];
		if (idx !== undefined) monthlyData[idx] = entry.totalCalories;
	});

	return monthlyData;
}

export function processYearlyData(
	rawData: any[],
	labelMap: Record<string, number>
): number[] {
	const yearlyData = new Array(12).fill(0);

	const monthMap: Record<number, string> = {
		1: "Jan",
		2: "Feb",
		3: "Mar",
		4: "Apr",
		5: "May",
		6: "Jun",
		7: "Jul",
		8: "Aug",
		9: "Sep",
		10: "Oct",
		11: "Nov",
		12: "Dec",
	};

	rawData.forEach((entry) => {
		const monthLabel = monthMap[entry._id];
		if (monthLabel !== undefined) {
			const idx = labelMap[monthLabel];
			if (idx !== undefined) yearlyData[idx] = entry.totalCalories;
		}
	});

	return yearlyData;
}

export function calculateTotalCalories(data: number[]): number {
	return data.reduce((sum, val) => sum + val, 0);
}

export const processWeeklyWorkoutFrequency = (
	rawData: any[],
	labels: string[],
	labelMap: Record<string, number>
) => {
	const data = Array(labels.length).fill(0);

	for (const item of rawData) {
		const day = dayjs(item._id).format("ddd"); // e.g., "Tue"
		const idx = labelMap[day];
		if (idx !== undefined) {
			data[idx] = item.count;
		}
	}

	return data;
};
