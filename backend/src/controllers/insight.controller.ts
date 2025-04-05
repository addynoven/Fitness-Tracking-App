// controllers/insightController.ts
import asyncHandler from "../middleware/asyncHandler";
import type { Request, Response } from "express";
import Activity from "../Models/Mongodb/Activity";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Type definitions
type TimeRange = "day" | "week" | "month" | "year";
type DateRangeConfig = {
	startDate: dayjs.Dayjs;
	endDate: dayjs.Dayjs;
	groupByExpression: Record<string, any>;
	labels: string[];
	labelMap: Record<string, number>;
};

export const getCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401);
			throw new Error("Unauthorized");
		}

		const range = (req.query.range as TimeRange) || "week";
		const { startDate, endDate, groupByExpression, labels, labelMap } =
			getDateRangeConfig(range);
		console.log({
			message: "getCaloriesInsight",
			userId,
			startDate,
			endDate,
			groupByExpression,
			labels,
			labelMap,
		});

		const rawData = await fetchActivityData(
			userId,
			startDate,
			endDate,
			groupByExpression
		);
		console.log({ message: "rawData", rawData });

		const caloriesArray = processRawData(rawData, range, labels, labelMap);
		const totalCalories = calculateTotalCalories(caloriesArray);

		res.json({
			range,
			labels,
			data: caloriesArray,
			totalCalories,
		});
	}
);

// Helper functions
function getDateRangeConfig(range: TimeRange): DateRangeConfig {
	const configs: Record<TimeRange, DateRangeConfig> = {
		day: {
			startDate: dayjs().subtract(24, "hour"),
			endDate: dayjs(),
			groupByExpression: { $hour: "$createdAt" },
			labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
			labelMap: Object.fromEntries(
				Array.from({ length: 24 }, (_, i) => [`${i}:00`, i])
			),
		},
		week: {
			startDate: dayjs().startOf("week").subtract(6, "day"), // Last Monday
			endDate: dayjs().startOf("week").subtract(0, "day").endOf("day"), // This Sunday
			groupByExpression: { $dayOfWeek: "$createdAt" },
			labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			labelMap: { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 },
		},
		month: {
			startDate: dayjs().startOf("month"),
			endDate: dayjs().endOf("month"),
			groupByExpression: { $dayOfMonth: "$createdAt" },
			labels: Array.from(
				{ length: dayjs().daysInMonth() },
				(_, i) => `${i + 1}`
			),
			labelMap: Object.fromEntries(
				Array.from({ length: dayjs().daysInMonth() }, (_, i) => [`${i + 1}`, i])
			),
		},
		year: {
			startDate: dayjs().startOf("year"),
			endDate: dayjs().endOf("year"),
			groupByExpression: { $month: "$createdAt" },
			labels: [
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
			],
			labelMap: Object.fromEntries(
				[
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
				].map((month, idx) => [month, idx])
			),
		},
	};

	return configs[range];
}

async function fetchActivityData(
	userId: string,
	startDate: dayjs.Dayjs,
	endDate: dayjs.Dayjs,
	groupByExpression: Record<string, any>
) {
	try {
		console.log("===== fetchActivityData DEBUG START =====");

		console.log("userId:", userId);
		console.log("startDate (raw):", startDate.toString());
		console.log("endDate (raw):", endDate.toString());

		const start = startDate.utc().toDate();
		const end = endDate.utc().toDate();

		console.log("startDate (UTC):", start);
		console.log("endDate (UTC):", end);

		// 1. Fetch ALL activities for that user
		const allUserActivities = await Activity.find({ userId });
		console.log(
			`Total activities for user ${userId}:`,
			allUserActivities.length
		);
		console.log("All activities:", allUserActivities);

		// 2. Match only those within the date range
		const matchedActivities = await Activity.find({
			userId,
			createdAt: {
				$gte: start,
				$lte: end,
			},
		});
		console.log("Matched activities in date range:", matchedActivities.length);
		console.log("Matched activities:", matchedActivities);

		// 3. Run aggregation pipeline step-by-step
		const aggregation = await Activity.aggregate([
			{
				$match: {
					userId,
					createdAt: {
						$gte: start,
						$lte: end,
					},
				},
			},
			{
				$project: {
					caloriesBurned: 1,
					createdAt: 1,
					weekday: { $dayOfWeek: "$createdAt" },
				},
			},
			{
				$group: {
					_id: { ...groupByExpression },
					totalCalories: { $sum: "$caloriesBurned" },
				},
			},
			{
				$sort: { _id: 1 }, // Optional: keep output sorted
			},
		]);

		console.log("Aggregation result:", aggregation);
		console.log("===== fetchActivityData DEBUG END =====");

		return aggregation;
	} catch (err) {
		console.error("Error in fetchActivityData:", err);
		throw err;
	}
}

function processRawData(
	rawData: any[],
	range: TimeRange,
	labels: string[],
	labelMap: Record<string, number>
): number[] {
	const caloriesArray = new Array(labels.length).fill(0);

	for (const entry of rawData) {
		const label = getLabelForEntry(entry._id, range, labels);
		const idx = labelMap[label];

		if (idx !== undefined) {
			caloriesArray[idx] = entry.totalCalories;
		}
	}

	return caloriesArray;
}

function getLabelForEntry(
	id: number,
	range: TimeRange,
	labels: string[]
): string {
	switch (range) {
		case "week":
			const weekdayMap: Record<number, string> = {
				1: "Sun",
				2: "Mon",
				3: "Tue",
				4: "Wed",
				5: "Thu",
				6: "Fri",
				7: "Sat",
			};
			return weekdayMap[id] || "Unknown";
		case "year":
			return labels[id - 1] || "Unknown"; // month is 1-12
		case "day":
			return `${id}:00`;
		default: // month
			return `${id}`;
	}
}

function calculateTotalCalories(caloriesArray: number[]): number {
	return caloriesArray.reduce((sum, calories) => sum + calories, 0);
}
