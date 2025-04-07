export type InsightRange = "week" | "month" | "year" | "lifetime";
export function parseInsightRange(value?: string): InsightRange {
	const lower = value?.toLowerCase();
	if (
		lower === "week" ||
		lower === "month" ||
		lower === "year" ||
		lower === "lifetime"
	) {
		return lower;
	}
	return "lifetime"; // default
}
export interface TypeBreakdownPayload {
	userId: string;
	baseDate: Date;
	range?: InsightRange;
}

export interface UserProfile {
	gender: "male" | "female";
	age: number;
	weightKg: number;
	heightCm?: number; // Optional for future expansion
}

export type ActivityType =
	| "yoga"
	| "cycling"
	| "running"
	| "swimming"
	| "weightlifting"
	| "walking"
	| "custom";
