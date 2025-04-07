// controllers/weight.controller.ts
import asyncHandler from "../middleware/asyncHandler";
import WeightEntry from "../Models/Mongodb/WeightEntry";

export const addWeightEntry = asyncHandler(async (req, res) => {
	const userId = req.user!.id;
	const { weight, date, note } = req.body;

	if (!weight || weight <= 0) {
		res.status(400);
		throw new Error("Weight must be a positive number");
	}

	const entry = await WeightEntry.create({
		userId,
		weight,
		date: date ? new Date(date) : new Date(),
		note,
	});

	res.status(201).json(entry);
});

export const getWeightHistory = asyncHandler(async (req, res) => {
	const userId = req.user!.id;

	const entries = await WeightEntry.find({ userId })
		.sort({ date: 1 }) // chronological
		.select("weight date");

	res.json(entries);
});
