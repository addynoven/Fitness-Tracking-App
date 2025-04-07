// services/weightInsight.service.ts
import WeightEntry from "../Models/Mongodb/WeightEntry";

export const getWeightTrendInsight = async (userId: string) => {
	const entries = await WeightEntry.find({ userId }).sort({ date: 1 });

	if (!entries.length) {
		return {
			trend: "neutral",
			startWeight: null,
			currentWeight: null,
			change: 0,
			message: "No weight data available.",
		};
	}

	const startWeight = entries[0]?.weight ?? null;
	const currentWeight = entries[entries.length - 1]?.weight ?? null;
	const change = (currentWeight ?? 0) - (startWeight ?? 0);

	let trend = "neutral";
	let message = "Your weight is stable.";

	if (change > 0) {
		trend = "gain";
		message = `You've gained ${change.toFixed(1)} kg since you started.`;
	} else if (change < 0) {
		trend = "loss";
		message = `You've lost ${Math.abs(change).toFixed(
			1
		)} kg since you started.`;
	}

	return {
		trend,
		startWeight,
		currentWeight,
		change: parseFloat(change.toFixed(1)),
		message,
	};
};
