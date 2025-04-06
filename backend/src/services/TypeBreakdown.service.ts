import { Types } from "mongoose";
import dayjs from "dayjs";
import Activity from "../Models/Mongodb/Activity";

export const getWorkoutTypeBreakdownService = async (
	userId: string,
	baseDate: Date
) => {
	const startDate = dayjs(baseDate).startOf("month").toDate();
	const endDate = dayjs(baseDate).endOf("month").toDate();

	const rawData = await Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId), // Convert to ObjectId
				date: { $gte: startDate, $lte: endDate },
			},
		},
		{
			$group: {
				_id: "$type",
				count: { $sum: 1 },
			},
		},
		{
			$sort: { count: -1 },
		},
	]);

	const labels = rawData.map((item) => item._id);
	const data = rawData.map((item) => item.count);

	return {
		range: "month",
		labels,
		data,
	};
};
