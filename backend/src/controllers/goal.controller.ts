import asyncHandler from "../middleware/asyncHandler";
import { Goal } from "../Models/Mongodb/Goal";

export const setOrUpdateGoal = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const { caloriesGoal, workoutsGoal, durationGoal } = req.body;

	const updatedGoal = await Goal.findOneAndUpdate(
		{ user: userId },
		{ caloriesGoal, workoutsGoal, durationGoal },
		{ upsert: true, new: true, setDefaultsOnInsert: true }
	);

	res.status(200).json({
		message: "Goal saved successfully",
		goal: updatedGoal,
	});
});
