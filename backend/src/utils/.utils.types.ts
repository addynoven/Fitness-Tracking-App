export type InsightRange = "week" | "month" | "lifetime";
export function parseInsightRange(value?: string): InsightRange {
	const lower = value?.toLowerCase();
	if (lower === "week" || lower === "month" || lower === "lifetime") {
		return lower;
	}
	return "lifetime"; // default
}
export interface TypeBreakdownPayload {
	userId: string;
	baseDate: Date;
	range?: InsightRange;
}
