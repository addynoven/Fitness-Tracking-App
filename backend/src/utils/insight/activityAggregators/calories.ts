import Activity from "../../../Models/Mongodb/Activity";
import { Types } from "mongoose";
import dayjs from "dayjs";

export async function fetchWeeklyActivityData(
	userId: string,
	start: dayjs.Dayjs,
	end: dayjs.Dayjs
) {
	return await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				date: { $gte: start.toDate(), $lte: end.toDate() },
			},
		},
		{
			$project: {
				caloriesBurned: 1,
				dayOfWeek: { $dayOfWeek: "$date" },
			},
		},
		{
			$group: {
				_id: "$dayOfWeek",
				totalCalories: { $sum: "$caloriesBurned" },
			},
		},
		{ $sort: { _id: 1 } },
	]);
}

export async function fetchDailyActivityData(
	userId: string,
	start: dayjs.Dayjs,
	end: dayjs.Dayjs
) {
	return await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				date: { $gte: start.toDate(), $lte: end.toDate() },
			},
		},
		{
			$project: {
				caloriesBurned: 1,
				hour: { $hour: "$date" },
			},
		},
		{
			$group: {
				_id: "$hour",
				totalCalories: { $sum: "$caloriesBurned" },
			},
		},
		{ $sort: { _id: 1 } },
	]);
}

export async function fetchMonthlyActivityData(
	userId: string,
	startDate: dayjs.Dayjs,
	endDate: dayjs.Dayjs
) {
	return await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
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
				totalCalories: { $sum: "$caloriesBurned" },
			},
		},
		{ $sort: { _id: 1 } },
	]);
}

export async function fetchYearlyActivityData(
	userId: string,
	startDate: dayjs.Dayjs,
	endDate: dayjs.Dayjs
) {
	return await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
			},
		},
		{
			$project: {
				caloriesBurned: 1,
				month: { $month: "$date" }, // 1 = Jan, 12 = Dec
			},
		},
		{
			$group: {
				_id: "$month",
				totalCalories: { $sum: "$caloriesBurned" },
			},
		},
		{ $sort: { _id: 1 } },
	]);
}
