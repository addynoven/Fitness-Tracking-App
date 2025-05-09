import type dayjs from "dayjs";
import Activity from "../../../Models/Mongodb/Activity";
import { Types } from "mongoose";

export const fetchWeeklyWorkoutFrequency = async (
	userId: string,
	startDate: dayjs.Dayjs,
	endDate: dayjs.Dayjs
) => {
	console.log("fetchWeeklyWorkoutFrequency function called");

	return await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
			},
		},
		{
			$group: {
				_id: {
					$dateToString: { format: "%Y-%m-%d", date: "$date" }, // fixed field
				},
				count: { $sum: 1 },
			},
		},
		{
			$sort: { _id: 1 },
		},
	]);
};

export const fetchMonthlyWorkoutData = async (
	userId: string,
	startDate: dayjs.Dayjs,
	endDate: dayjs.Dayjs
) => {
	return await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				date: {
					$gte: startDate.toDate(),
					$lte: endDate.toDate(),
				},
			},
		},
		{
			$project: {
				caloriesBurned: 1,
				day: { $dayOfMonth: "$date" }, // 1–31
			},
		},
		{
			$group: {
				_id: "$day",
				count: { $sum: 1 },
			},
		},
	]);
};
