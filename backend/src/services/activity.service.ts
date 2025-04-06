import Activity from "../Models/Mongodb/Activity";

export const handleCreateActivity = async (userId: string, data: any) => {
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
