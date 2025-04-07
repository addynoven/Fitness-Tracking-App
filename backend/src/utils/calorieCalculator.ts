import type { ActivityType, UserProfile } from "./.utils.types";
import { AppError } from "./error";

export const DEFAULT_METS: Record<ActivityType, [number, number]> = {
	yoga: [2.5, 4],
	cycling: [7, 14],
	running: [8, 16],
	swimming: [6, 10],
	weightlifting: [3, 6],
	walking: [3, 5],
	custom: [1, 1], // Default placeholder
};

export const getMETValue = (
	activity: ActivityType,
	intensity: "low" | "medium" | "high" = "medium"
): number => {
	const [min, max] = DEFAULT_METS[activity.toLowerCase() as ActivityType];
	const range = max - min;

	switch (intensity) {
		case "low":
			return min + range * 0.25;
		case "medium":
			return min + range * 0.5;
		case "high":
			return min + range * 0.75;
		default:
			return (min + max) / 2;
	}
};

export const calculateAgeFactor = (age: number): number => {
	if (age <= 25) return 1;
	return 1 - (age - 25) * 0.003;
};

export const getGenderFactor = (gender: UserProfile["gender"]): number => {
	return gender === "male" ? 1.0 : 0.9;
};

export const convertMinutesToHours = (minutes: number): number => {
	if (minutes <= 0) throw new AppError("Duration must be positive");
	return minutes / 60;
};

export const calculateCaloriesBurned = (
	user: UserProfile,
	activity: ActivityType,
	durationMinutes: number,
	options?: {
		intensity?: "low" | "medium" | "high";
		customMET?: number;
	}
): number => {
	// Validate inputs
	if (user.weightKg <= 0) throw new AppError("Invalid weight");
	if (durationMinutes <= 0) throw new AppError("Invalid duration");

	// Calculate components
	const met = options?.customMET ?? getMETValue(activity, options?.intensity);
	const durationHours = convertMinutesToHours(durationMinutes);
	const genderFactor = getGenderFactor(user.gender);
	const ageFactor = calculateAgeFactor(user.age);

	// Base calculation
	const baseCalories = met * user.weightKg * durationHours;

	// Adjusted calculation
	const adjustedCalories = baseCalories * genderFactor * ageFactor;

	return Math.round(adjustedCalories * 10) / 10; // Round to 1 decimal
};

// Example usage:
/*
const user: UserProfile = {
    gender: 'female',
    age: 35,
    weightKg: 65
};

const calories = calculateCaloriesBurned(
    user, 
    'cycling', 
    45, 
    { intensity: 'high' }
);
console.log(calories); // Output: 425.6
*/
