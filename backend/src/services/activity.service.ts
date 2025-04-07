import type { UserProfile } from "./../utils/.utils.types";
import Activity from "../Models/Mongodb/Activity";
import User_Profile from "../Models/Mongodb/UserProfile";
import { calculateCaloriesBurned } from "../utils/calorieCalculator";
import { AppError } from "../utils/error";

export const handleCreateActivity = async (userId: string, data: any) => {
	if (!data.duration) throw new AppError("Duration is required");
	if (!data.caloriesBurned) {
		const user_data = await User_Profile.findOne({ userId });
		data.caloriesBurned = calculateCaloriesBurned(
			{
				gender: user_data?.gender?.toLowerCase() as
					| "male"
					| "female"
					| undefined,
				age: user_data?.age as number,
				weightKg: user_data?.weight as number,
			} as UserProfile,
			data.type,
			data.duration
		);
		console.log(data.caloriesBurned);
	}
	return await Activity.create({ ...data, userId });
};

export const handleGetAllActivities = async (userId: string) => {
	return await Activity.find({ userId }).sort({ date: -1 });
};

export const handleGetActivityById = async (
	userId: string,
	activityId: string
) => {
	return await Activity.findOne({ _id: activityId, userId });
};

export const handleUpdateActivity = async (
	userId: string,
	activityId: string,
	updates: any
) => {
	return await Activity.findOneAndUpdate(
		{ _id: activityId, userId },
		{ ...updates },
		{ new: true }
	);
};

export const handleDeleteActivity = async (
	userId: string,
	activityId: string
) => {
	const deleted = await Activity.findOneAndDelete({ _id: activityId, userId });
	return !!deleted;
};
