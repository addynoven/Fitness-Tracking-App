import dayjs from "dayjs";

type baseDateType = string | Date | dayjs.Dayjs;

export function getWeeklyDateRangeConfig(baseDate: baseDateType) {
	const today = baseDate ? dayjs(baseDate) : dayjs();
	const dayOfWeek = today.day(); // 0 = Sun ... 6 = Sat
	const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

	const startDate = today.subtract(diff, "day").startOf("day");
	const endDate = startDate.add(6, "day").endOf("day");

	const labelMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
	const labels = Object.keys(labelMap);

	return { startDate, endDate, labels, labelMap };
}

export function getDailyDateRangeConfig(baseDate: baseDateType) {
	const today = baseDate ? dayjs(baseDate) : dayjs();
	const startDate = today.startOf("day");
	const endDate = today.endOf("day");

	const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
	const labelMap = Object.fromEntries(labels.map((l, i) => [l, i]));

	return { startDate, endDate, labels, labelMap };
}

export function getMonthlyDateRangeConfig(baseDate: baseDateType) {
	const now = baseDate ? dayjs(baseDate) : dayjs();
	const startDate = now.startOf("month");
	const endDate = now.endOf("month");

	const totalDays = endDate.date(); // e.g., 30 for April
	const labels = Array.from({ length: totalDays }, (_, i) =>
		startDate.add(i, "day").format("MMM D")
	);
	const labelMap = Object.fromEntries(labels.map((label, i) => [label, i]));

	return { startDate, endDate, labels, labelMap };
}

export function getYearlyDateRangeConfig(baseDate: baseDateType) {
	const now = baseDate ? dayjs(baseDate) : dayjs();
	const startDate = now.startOf("year");
	const endDate = now.endOf("year");

	const labels = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const labelMap = Object.fromEntries(labels.map((label, i) => [label, i]));

	return { startDate, endDate, labels, labelMap };
}
