import dayjs from "dayjs";
import Activity from "../Models/Mongodb/Activity";
import { Types } from "mongoose";

export const getMonthlyComparisonService = async (
	userId: string,
	baseDate: Date
) => {
	// Use dayjs for date calculations
	const currentBase = dayjs(baseDate);

	// Define current month range
	const currentStart = currentBase.startOf("month").toDate();
	const currentEnd = currentBase.endOf("month").toDate();

	// Define last month range
	const lastMonth = currentBase.subtract(1, "month");
	const lastStart = lastMonth.startOf("month").toDate();
	const lastEnd = lastMonth.endOf("month").toDate();

	// Query MongoDB for workout counts
	const currentCount = await Activity.countDocuments({
		userId: new Types.ObjectId(userId),
		date: { $gte: currentStart, $lte: currentEnd },
	});

	const lastCount = await Activity.countDocuments({
		userId: new Types.ObjectId(userId),
		date: { $gte: lastStart, $lte: lastEnd },
	});

	// Calculate percentage change and build message
	let percentageChange = 0;
	let message = "";

	if (lastCount === 0) {
		if (currentCount === 0) {
			message = "You did no workouts last month and this month.";
		} else {
			// When there's no data for last month, consider it as the first month of activity.
			percentageChange = 100;
			message = "This is your first month of workouts!";
		}
	} else {
		percentageChange = Math.round(
			((currentCount - lastCount) / lastCount) * 100
		);
		if (currentCount > lastCount) {
			message = `You did ${percentageChange}% more workouts than last month!`;
		} else if (currentCount < lastCount) {
			message = `You did ${Math.abs(
				percentageChange
			)}% fewer workouts than last month!`;
		} else {
			message = "You did the same number of workouts as last month!";
		}
	}

	return {
		range: "month",
		currentCount,
		lastCount,
		percentageChange,
		message,
	};
};
