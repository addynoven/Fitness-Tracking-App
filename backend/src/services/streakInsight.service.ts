import Activity from "../Models/Mongodb/Activity";
import { Types } from "mongoose";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppError } from "../utils/error";

dayjs.extend(utc);
interface StreakResult {
	longestStreak: number;
	currentStreak: number;
}

export const getStreakInsightService = async (
	userId: string
): Promise<StreakResult> => {
	try {
		const activityDates = await getUniqueActivityDates(userId);

		if (activityDates.length === 0) {
			return { longestStreak: 0, currentStreak: 0 };
		}

		return {
			longestStreak: calculateLongestStreak(activityDates),
			currentStreak: calculateCurrentStreak(activityDates),
		};
	} catch (error) {
		console.error("Streak calculation error:", error);
		throw new AppError("Failed to calculate activity streaks");
	}
};

async function getUniqueActivityDates(userId: string): Promise<dayjs.Dayjs[]> {
	const rawData = await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				date: { $exists: true },
			},
		},
		{
			$group: {
				_id: {
					$dateToString: {
						format: "%Y-%m-%d",
						date: "$date",
						timezone: "UTC",
					},
				},
			},
		},
		{ $sort: { _id: 1 } },
	]);

	return rawData.map((d) => dayjs.utc(d._id));
}

function calculateLongestStreak(dates: dayjs.Dayjs[]): number {
	let longest = 0;
	let current = 0;
	let prevDate: dayjs.Dayjs | null = null;

	for (const date of dates) {
		if (prevDate && date.diff(prevDate, "day") === 1) {
			current++;
		} else {
			current = 1;
		}

		longest = Math.max(longest, current);
		prevDate = date;
	}

	return longest;
}

function calculateCurrentStreak(dates: dayjs.Dayjs[]): number {
	let streak = 0;
	let today = dayjs.utc().startOf("day");
	const dateSet = new Set(dates.map((d) => d.format("YYYY-MM-DD")));

	while (dateSet.has(today.format("YYYY-MM-DD"))) {
		streak++;
		today = today.subtract(1, "day");
	}

	return streak;
}
