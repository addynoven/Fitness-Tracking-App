import { Types } from "mongoose";
import Activity from "../../../Models/Mongodb/Activity";

export const fetchWeeklyWorkoutFrequency = async (
	userId: string,
	startDate: Date,
	endDate: Date
) => {
	console.log("fetchWeeklyWorkoutFrequency function called");
	const user_Activity_data = await Activity.findById(userId);
	console.log(user_Activity_data);
	return Activity.aggregate([
		{
			$match: {
				userId: new Types.ObjectId(userId),
				timestamp: { $gte: startDate, $lte: endDate },
			},
		},
		{
			$group: {
				_id: {
					$dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
				},
				count: { $sum: 1 },
			},
		},
		{
			$sort: { _id: 1 },
		},
	]);
};
