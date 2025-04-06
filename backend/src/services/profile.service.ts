import UserProfile from "../Models/Mongodb/UserProfile";

// Used by /me route
export const handleGetAuthenticatedUser = (req: any) => {
	return req.user || null;
};

// Used by POST /profile
export const handleCreateOrUpdateProfile = async (
	userId: string,
	body: any
) => {
	const {
		age,
		weight,
		height,
		fitnessGoals,
		gender,
		activityLevel,
		dietaryPreferences,
	} = body;

	const parsedPreferences = Array.isArray(dietaryPreferences)
		? dietaryPreferences
		: dietaryPreferences?.split(",").map((s: string) => s.trim());

	const profile = await UserProfile.findOneAndUpdate(
		{ userId },
		{
			age: Number(age),
			weight: Number(weight),
			height: Number(height),
			fitnessGoals,
			gender,
			activityLevel,
			dietaryPreferences: parsedPreferences,
		},
		{ new: true, upsert: true }
	);

	return profile;
};

// Used by GET /profile
export const handleGetUserProfile = async (userId: string) => {
	return await UserProfile.findOne({ userId }).populate("activities");
};
